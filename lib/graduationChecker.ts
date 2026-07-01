import type { Course } from "../data/courses.ts";
import type {
  GraduationRequirement,
  GraduationRules
} from "../data/graduationRules.ts";
import type { AcademicProfile } from "./profile.ts";

export interface RequirementStatus {
  key: string;
  label: string;
  description: string;
  completedUnits: number;
  requiredUnits: number;
  missingUnits: number;
  progress: number;
  completedCourses: Course[];
  missingCourses: Course[];
}

export interface GraduationCheckResult {
  overallProgress: number;
  completedRequirements: RequirementStatus[];
  remainingRequirements: RequirementStatus[];
  missingCourses: Course[];
  missingUnits: number;
  totalCompletedUnits: number;
  totalRequiredUnits: number;
  prerequisiteWarnings: string[];
  requirementStatuses: RequirementStatus[];
}

function normalizeCourseCodes(courseCodes: string[] = []): Set<string> {
  return new Set(
    courseCodes.map((courseCode) => courseCode.trim().toUpperCase()).filter(Boolean)
  );
}

function sumUnits(courses: Course[]) {
  return courses.reduce((total, course) => total + course.units, 0);
}

function clampProgress(completedUnits: number, requiredUnits: number) {
  if (requiredUnits <= 0) {
    return 100;
  }

  return Math.min(100, Math.round((completedUnits / requiredUnits) * 100));
}

function uniqueCourses(courses: Course[]): Course[] {
  const seenCourseCodes = new Set<string>();

  return courses.filter((course) => {
    if (seenCourseCodes.has(course.code)) {
      return false;
    }

    seenCourseCodes.add(course.code);
    return true;
  });
}

function getCompletedCourses(courses: Course[], completedCourseCodes: Set<string>) {
  return courses.filter((course) => completedCourseCodes.has(course.code));
}

function getMissingCoursesForUnits(candidates: Course[], completedCourseCodes: Set<string>, missingUnits: number) {
  if (missingUnits <= 0) {
    return [];
  }

  const missingCourses: Course[] = [];
  let unitsNeeded = missingUnits;

  candidates
    .filter((course) => !completedCourseCodes.has(course.code))
    .forEach((course) => {
      if (unitsNeeded <= 0) {
        return;
      }

      missingCourses.push(course);
      unitsNeeded -= course.units;
    });

  return missingCourses;
}

function evaluateCourseListRequirement(
  requirement: GraduationRequirement,
  courses: Course[],
  completedCourseCodes: Set<string>
): RequirementStatus {
  const requiredCourseCodes = new Set(requirement.requiredCourseCodes ?? []);
  const requirementCourses = courses.filter((course) => requiredCourseCodes.has(course.code));
  const completedCourses = requirementCourses.filter((course) =>
    completedCourseCodes.has(course.code)
  );
  const missingCourses = requirementCourses.filter(
    (course) => !completedCourseCodes.has(course.code)
  );
  const completedUnits = sumUnits(completedCourses);

  return {
    key: requirement.key,
    label: requirement.label,
    description: requirement.description,
    completedUnits,
    requiredUnits: requirement.requiredUnits,
    missingUnits: Math.max(requirement.requiredUnits - completedUnits, 0),
    progress: clampProgress(completedUnits, requirement.requiredUnits),
    completedCourses,
    missingCourses
  };
}

function evaluateCategoryRequirement(
  requirement: GraduationRequirement,
  courses: Course[],
  completedCourseCodes: Set<string>
): RequirementStatus {
  const categories = new Set(requirement.categories ?? []);
  const candidateCourses = courses.filter((course) => categories.has(course.category));
  const completedCourses = candidateCourses.filter((course) =>
    completedCourseCodes.has(course.code)
  );
  const completedUnits = sumUnits(completedCourses);
  const missingUnits = Math.max(requirement.requiredUnits - completedUnits, 0);

  return {
    key: requirement.key,
    label: requirement.label,
    description: requirement.description,
    completedUnits,
    requiredUnits: requirement.requiredUnits,
    missingUnits,
    progress: clampProgress(completedUnits, requirement.requiredUnits),
    completedCourses,
    missingCourses: getMissingCoursesForUnits(candidateCourses, completedCourseCodes, missingUnits)
  };
}

function evaluateLevelRequirement(
  requirement: GraduationRequirement,
  courses: Course[],
  completedCourseCodes: Set<string>
): RequirementStatus {
  const levels = new Set(requirement.levels ?? []);
  const candidateCourses = courses.filter((course) => levels.has(course.level));
  const completedCourses = candidateCourses.filter((course) =>
    completedCourseCodes.has(course.code)
  );
  const completedUnits = sumUnits(completedCourses);
  const missingUnits = Math.max(requirement.requiredUnits - completedUnits, 0);

  return {
    key: requirement.key,
    label: requirement.label,
    description: requirement.description,
    completedUnits,
    requiredUnits: requirement.requiredUnits,
    missingUnits,
    progress: clampProgress(completedUnits, requirement.requiredUnits),
    completedCourses,
    missingCourses: getMissingCoursesForUnits(candidateCourses, completedCourseCodes, missingUnits)
  };
}

function evaluateTotalUnitsRequirement(
  requirement: GraduationRequirement,
  completedCourses: Course[]
): RequirementStatus {
  const completedUnits = sumUnits(completedCourses);

  return {
    key: requirement.key,
    label: requirement.label,
    description: requirement.description,
    completedUnits,
    requiredUnits: requirement.requiredUnits,
    missingUnits: Math.max(requirement.requiredUnits - completedUnits, 0),
    progress: clampProgress(completedUnits, requirement.requiredUnits),
    completedCourses,
    missingCourses: []
  };
}

function evaluateRequirement(
  requirement: GraduationRequirement,
  courses: Course[],
  completedCourses: Course[],
  completedCourseCodes: Set<string>
): RequirementStatus {
  if (requirement.type === "course-list") {
    return evaluateCourseListRequirement(requirement, courses, completedCourseCodes);
  }

  if (requirement.type === "category-units") {
    return evaluateCategoryRequirement(requirement, courses, completedCourseCodes);
  }

  if (requirement.type === "level-units") {
    return evaluateLevelRequirement(requirement, courses, completedCourseCodes);
  }

  return evaluateTotalUnitsRequirement(requirement, completedCourses);
}

export function findPrerequisiteWarnings(courses: Course[], completedCourseCodes: Set<string>) {
  return courses
    .filter((course) => completedCourseCodes.has(course.code))
    .flatMap((course) => {
      const missingPrerequisites = course.prerequisites.filter(
        (prerequisite) => !completedCourseCodes.has(prerequisite)
      );

      if (missingPrerequisites.length === 0) {
        return [];
      }

      return `${course.code} is marked as completed, but missing prerequisite(s): ${missingPrerequisites.join(", ")}.`;
    });
}

export function checkGraduation(
  profile: AcademicProfile,
  courses: Course[],
  rules: GraduationRules
): GraduationCheckResult {
  const completedCourseCodes = normalizeCourseCodes(profile.completedCourses);
  const completedCourses = getCompletedCourses(courses, completedCourseCodes);
  const requirementStatuses = rules.requirements.map((requirement) =>
    evaluateRequirement(requirement, courses, completedCourses, completedCourseCodes)
  );
  const completedRequirements = requirementStatuses.filter(
    (requirement) => requirement.missingUnits === 0
  );
  const remainingRequirements = requirementStatuses.filter(
    (requirement) => requirement.missingUnits > 0
  );
  const totalCompletedUnits = sumUnits(completedCourses);
  const totalRequiredUnits = rules.totalUnits;
  const overallProgress =
    requirementStatuses.length === 0
      ? 0
      : Math.round(
          requirementStatuses.reduce(
            (total, requirement) => total + requirement.progress,
            0
          ) / requirementStatuses.length
        );

  return {
    overallProgress,
    completedRequirements,
    remainingRequirements,
    missingCourses: uniqueCourses(
      remainingRequirements.flatMap((requirement) => requirement.missingCourses)
    ),
    missingUnits: Math.max(totalRequiredUnits - totalCompletedUnits, 0),
    totalCompletedUnits,
    totalRequiredUnits,
    prerequisiteWarnings: findPrerequisiteWarnings(courses, completedCourseCodes),
    requirementStatuses
  };
}
