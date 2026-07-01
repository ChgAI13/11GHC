import { load, save } from "./storage.ts";

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

export const DEFAULT_ACADEMIC_PROFILE: AcademicProfile = {
  university: "University of Queensland",
  program: "Bachelor of Economics",
  currentGpa: "",
  targetGpa: "",
  completedCourses: [],
  preferredWorkload: "Medium",
  expectedGraduationSemester: ""
};

const VALID_WORKLOADS = new Set<AcademicWorkload>(["Light", "Medium", "Heavy"]);

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

function hasSavedProfile(profile: Partial<AcademicProfile>) {
  return Object.keys(profile).length > 0;
}

export function loadProfile(): AcademicProfile {
  const savedProfile = load<Partial<AcademicProfile>>("academicProfile", {});

  if (hasSavedProfile(savedProfile)) {
    return normalizeProfile(savedProfile);
  }

  const legacyCoursePlannerProfile = load<Partial<AcademicProfile>>("coursePlanner", {});

  if (hasSavedProfile(legacyCoursePlannerProfile)) {
    const migratedProfile = normalizeProfile(legacyCoursePlannerProfile);
    save("academicProfile", migratedProfile);

    return migratedProfile;
  }

  return DEFAULT_ACADEMIC_PROFILE;
}

export function saveProfile(profile: AcademicProfile): AcademicProfile {
  const normalizedProfile = normalizeProfile(profile);
  save("academicProfile", normalizedProfile);

  return normalizedProfile;
}

export function updateProfile(profileUpdate: Partial<AcademicProfile>): AcademicProfile {
  const nextProfile = normalizeProfile({
    ...loadProfile(),
    ...profileUpdate
  });

  saveProfile(nextProfile);

  return nextProfile;
}
