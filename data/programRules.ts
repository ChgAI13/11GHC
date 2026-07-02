import { uqBachelorOfBusiness2026ProgramRule } from "./programs/business-2026.ts";
import { uqBachelorOfCommerce2026ProgramRule } from "./programs/commerce-2026.ts";
import { uqBachelorOfEconomics2026ProgramRule } from "./programs/economics-2026.ts";
import type { CourseCategory, CourseLevel } from "./courses.ts";

export type ProgramRequirementType =
  | "course-list"
  | "category-units"
  | "level-units"
  | "level-units-max"
  | "total-units"
  | "plan-choice";

export interface ProgramCourseReference {
  courseCode: string;
  courseName: string;
  units: number;
  level: CourseLevel;
  category: CourseCategory;
}

export interface ProgramPlanOption {
  planCode: string;
  planName: string;
  requiredUnits: number;
}

export interface ProgramRequirement {
  key: string;
  label: string;
  type: ProgramRequirementType;
  requiredUnits: number;
  description: string;
  sourceUrl: string;
  requiredCourseCodes?: string[];
  courses?: ProgramCourseReference[];
  categories?: CourseCategory[];
  levels?: CourseLevel[];
  minUnits?: number;
  maxUnits?: number;
  options?: ProgramPlanOption[];
}

export interface ProgramRule {
  university: "University of Queensland";
  programCode: string;
  programName: string;
  year: number;
  totalUnits: number;
  sourceUrl: string;
  coreRequirements: ProgramRequirement[];
  flexibleCoreRequirements: ProgramRequirement[];
  electiveRequirements: ProgramRequirement[];
  levelRequirements: ProgramRequirement[];
  graduationRequirements: ProgramRequirement[];
}

export const DEFAULT_PROGRAM_CODE = "2467";
export const DEFAULT_PROGRAM_YEAR = 2026;

const supportedProgramRules = [
  uqBachelorOfEconomics2026ProgramRule,
  uqBachelorOfCommerce2026ProgramRule,
  uqBachelorOfBusiness2026ProgramRule
].filter((programRule): programRule is ProgramRule => Boolean(programRule));

export const programRules: ProgramRule[] = supportedProgramRules;

function normalizeProgramName(programName = "") {
  return programName.trim().toLowerCase();
}

export function getProgramRule(
  programCode = DEFAULT_PROGRAM_CODE,
  year = DEFAULT_PROGRAM_YEAR
): ProgramRule {
  const programRule = programRules.find(
    (rule) => rule.programCode === programCode && rule.year === year
  );

  if (!programRule) {
    throw new Error(`Program rule not found for ${programCode}/${year}.`);
  }

  return programRule;
}

export function getProgramRuleForProfile(
  profile: { program?: string; university?: string },
  year = DEFAULT_PROGRAM_YEAR
): ProgramRule {
  const programName = normalizeProgramName(profile.program);
  const programRule = programRules.find(
    (rule) =>
      rule.year === year &&
      normalizeProgramName(rule.programName) === programName &&
      (!profile.university || rule.university === profile.university)
  );

  return programRule ?? getProgramRule(DEFAULT_PROGRAM_CODE, year);
}
