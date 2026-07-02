import { uqEconomicsCourses } from "./economicsCourses.ts";
import { uqBachelorOfEconomics2026ProgramRule } from "./programs/economics-2026.ts";

export type CourseLevel = 1 | 2 | 3;

export type CourseCategory =
  | "Economics Core"
  | "Economics Elective"
  | "Quantitative Core"
  | "General Elective";

export type SemesterAvailability = 1 | 2 | "Both";

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface Course {
  code: string;
  name: string;
  units: number;
  level: CourseLevel;
  category: CourseCategory;
  difficulty: Rating;
  mathIntensity: Rating;
  examWeight: number;
  assignmentWeight: number;
  groupWork: boolean;
  estimatedStudyHours: number;
  prerequisites: string[];
  semester: SemesterAvailability;
  description: string;
}

const courseCodes = new Set(uqEconomicsCourses.map((course) => course.courseCode));
const programCategoryByCourseCode = new Map(
  [
    ...uqBachelorOfEconomics2026ProgramRule.coreRequirements,
    ...uqBachelorOfEconomics2026ProgramRule.flexibleCoreRequirements
  ].flatMap((requirement) =>
    (requirement.courses ?? []).map((course) => [course.courseCode, course.category] as const)
  )
);

function toCourseLevel(level: CourseLevel | "unknown"): CourseLevel {
  return level === 1 || level === 2 || level === 3 ? level : 1;
}

function toRating(value: number | null): Rating {
  return value === 1 || value === 2 || value === 3 || value === 4 || value === 5 ? value : 3;
}

function toSemesterAvailability(semester: string[] | "unknown"): SemesterAvailability {
  if (!Array.isArray(semester)) {
    return "Both";
  }

  const hasSemester1 = semester.some((value) => value.includes("Semester 1"));
  const hasSemester2 = semester.some((value) => value.includes("Semester 2"));

  if (hasSemester1 && hasSemester2) {
    return "Both";
  }

  if (hasSemester1) {
    return 1;
  }

  if (hasSemester2) {
    return 2;
  }

  return "Both";
}

function toCourseCategory(courseCode: string, sourceCategory: string): CourseCategory {
  const programCategory = programCategoryByCourseCode.get(courseCode);

  if (programCategory) {
    return programCategory;
  }

  if (sourceCategory === "Language") {
    return "General Elective";
  }

  return "Economics Elective";
}

function extractCourseCodesFromPrerequisiteText(text: string): string[] {
  const relevantText = text.split(/\.\s*For\s+/i)[0];
  const requirementParts = relevantText.split(/\s*\+\s*|\s*;\s*|\s+and\s+/i);

  return [
    ...new Set(
      requirementParts
        .map((part) => {
          const fullCodes = Array.from(part.matchAll(/[A-Z]{4}\d{4}/g), (match) => match[0]);
          const textWithoutFullCodes = part.replace(/[A-Z]{4}\d{4}/g, " ");
          const shortEconomicsCodes = Array.from(
            textWithoutFullCodes.matchAll(/(?<![A-Z])\b\d{4}\b/g),
            (match) => `ECON${match[0]}`
          );

          return [...fullCodes, ...shortEconomicsCodes].find((code) => courseCodes.has(code));
        })
        .filter((code): code is string => Boolean(code))
    )
  ];
}

function toPrerequisites(prerequisites: string[] | "unknown"): string[] {
  if (!Array.isArray(prerequisites)) {
    return [];
  }

  return [
    ...new Set(
      prerequisites.flatMap((prerequisite) => extractCourseCodesFromPrerequisiteText(prerequisite))
    )
  ];
}

export const uqBachelorOfEconomicsCourses: Course[] = uqEconomicsCourses.map((course) => ({
  code: course.courseCode,
  name: course.courseName,
  units: course.units ?? 2,
  level: toCourseLevel(course.level),
  category: toCourseCategory(course.courseCode, course.category),
  difficulty: toRating(course.difficultyScore),
  mathIntensity: toRating(course.mathIntensity),
  examWeight: course.examWeight ?? 50,
  assignmentWeight: course.assignmentWeight ?? 50,
  groupWork: course.groupWork ?? false,
  estimatedStudyHours: course.estimatedStudyHours ?? 10,
  prerequisites: toPrerequisites(course.prerequisites),
  semester: toSemesterAvailability(course.semester),
  description: course.description
}));

export const uqBachelorOfEconomicsCourseByCode = new Map(
  uqBachelorOfEconomicsCourses.map((course) => [course.code, course])
);

export function getBachelorOfEconomicsCourse(courseCode: string): Course | undefined {
  return uqBachelorOfEconomicsCourseByCode.get(courseCode.trim().toUpperCase());
}

export function getBachelorOfEconomicsCourseCodes(): Set<string> {
  return new Set(uqBachelorOfEconomicsCourseByCode.keys());
}
