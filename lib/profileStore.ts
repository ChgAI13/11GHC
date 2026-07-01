export type AcademicWorkload = "Light" | "Medium" | "Heavy";

export interface AcademicProfile {
  university: string;
  program: string;
  currentGpa: string;
  targetGpa: string;
  completedCourses: string[];
  preferredWorkload: AcademicWorkload;
  expectedGraduationSemester: string;
}

type AppStorage = {
  academicProfile?: Partial<AcademicProfile>;
  coursePlanner?: Partial<AcademicProfile>;
};

type ProfileSubscriber = (profile: AcademicProfile) => void;

export const DEFAULT_ACADEMIC_PROFILE: AcademicProfile = {
  university: "University of Queensland",
  program: "Bachelor of Economics",
  currentGpa: "",
  targetGpa: "",
  completedCourses: [],
  preferredWorkload: "Medium",
  expectedGraduationSemester: ""
};

const STORAGE_KEY = "uq-academic-planner:persistence:v1";
const VALID_WORKLOADS = new Set<AcademicWorkload>(["Light", "Medium", "Heavy"]);
const subscribers = new Set<ProfileSubscriber>();

let currentProfile = DEFAULT_ACADEMIC_PROFILE;
let hasHydratedProfile = false;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readStorage(): AppStorage {
  if (!canUseStorage()) {
    return {};
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : {};
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return {};
  }
}

function writeStorage(nextStorage: AppStorage) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStorage));
}

function normalizeCourseCodes(courseCodes: unknown): string[] {
  if (!Array.isArray(courseCodes)) {
    return [];
  }

  return [
    ...new Set(
      courseCodes
        .filter((courseCode): courseCode is string => typeof courseCode === "string")
        .map((courseCode) => courseCode.trim().toUpperCase())
        .filter(Boolean)
    )
  ];
}

function normalizeWorkload(workload: unknown): AcademicWorkload {
  return typeof workload === "string" && VALID_WORKLOADS.has(workload as AcademicWorkload)
    ? (workload as AcademicWorkload)
    : DEFAULT_ACADEMIC_PROFILE.preferredWorkload;
}

function normalizeProfile(profile: Partial<AcademicProfile> = {}): AcademicProfile {
  return {
    university:
      typeof profile.university === "string" && profile.university.trim()
        ? profile.university.trim()
        : DEFAULT_ACADEMIC_PROFILE.university,
    program:
      typeof profile.program === "string" && profile.program.trim()
        ? profile.program.trim()
        : DEFAULT_ACADEMIC_PROFILE.program,
    currentGpa:
      typeof profile.currentGpa === "string"
        ? profile.currentGpa.trim()
        : DEFAULT_ACADEMIC_PROFILE.currentGpa,
    targetGpa:
      typeof profile.targetGpa === "string"
        ? profile.targetGpa.trim()
        : DEFAULT_ACADEMIC_PROFILE.targetGpa,
    completedCourses: normalizeCourseCodes(profile.completedCourses),
    preferredWorkload: normalizeWorkload(profile.preferredWorkload),
    expectedGraduationSemester:
      typeof profile.expectedGraduationSemester === "string"
        ? profile.expectedGraduationSemester.trim()
        : DEFAULT_ACADEMIC_PROFILE.expectedGraduationSemester
  };
}

function hasSavedProfile(profile: Partial<AcademicProfile> | undefined) {
  return Boolean(profile && Object.keys(profile).length > 0);
}

function loadProfileFromStorage(): AcademicProfile {
  const savedStorage = readStorage();

  if (hasSavedProfile(savedStorage.academicProfile)) {
    return normalizeProfile(savedStorage.academicProfile);
  }

  if (hasSavedProfile(savedStorage.coursePlanner)) {
    const migratedProfile = normalizeProfile(savedStorage.coursePlanner);
    writeStorage({
      ...savedStorage,
      academicProfile: migratedProfile
    });

    return migratedProfile;
  }

  return DEFAULT_ACADEMIC_PROFILE;
}

function notifySubscribers() {
  subscribers.forEach((subscriber) => subscriber(currentProfile));
}

export function loadProfile(): AcademicProfile {
  if (!hasHydratedProfile) {
    currentProfile = loadProfileFromStorage();
    hasHydratedProfile = true;
  }

  return currentProfile;
}

export function saveProfile(profile: AcademicProfile): AcademicProfile {
  const normalizedProfile = normalizeProfile(profile);
  const currentStorage = readStorage();

  currentProfile = normalizedProfile;
  hasHydratedProfile = true;

  writeStorage({
    ...currentStorage,
    academicProfile: normalizedProfile
  });

  notifySubscribers();

  return normalizedProfile;
}

export function updateProfile(profileUpdate: Partial<AcademicProfile>): AcademicProfile {
  return saveProfile({
    ...loadProfile(),
    ...profileUpdate
  });
}

export function subscribe(subscriber: ProfileSubscriber) {
  subscribers.add(subscriber);

  return () => {
    subscribers.delete(subscriber);
  };
}

export function getProfileSnapshot(): AcademicProfile {
  return currentProfile;
}
