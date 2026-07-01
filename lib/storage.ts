export type StorageSection =
  | "dashboard"
  | "academicProfile"
  | "gpaPlanner"
  | "coursePlanner"
  | "translator"
  | "language";

type AppStorage = Partial<Record<StorageSection, unknown>>;

const STORAGE_KEY = "uq-academic-planner:persistence:v1";

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

export function save<T>(section: StorageSection, value: T) {
  const currentStorage = readStorage();

  writeStorage({
    ...currentStorage,
    [section]: value
  });
}

export function load<T>(section: StorageSection, fallbackValue: T): T {
  const currentStorage = readStorage();
  const sectionValue = currentStorage[section];

  if (sectionValue === undefined || sectionValue === null) {
    return fallbackValue;
  }

  return sectionValue as T;
}

export function clear() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function loadAll(): AppStorage {
  return readStorage();
}
