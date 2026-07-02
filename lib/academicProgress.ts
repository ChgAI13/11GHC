import { getProgramRuleForProfile } from "../data/programRules.ts";
import type { AcademicProfile } from "./profileStore.ts";

export const STANDARD_COURSE_UNITS = 2;

export interface AcademicProgressSummary {
  totalUnits: number;
  completedUnits: number;
  remainingUnits: number;
  totalCourseCount: number;
  completedCourseCount: number;
  remainingCourseCount: number;
}

export function calculateAcademicProgress(
  profile: AcademicProfile
): AcademicProgressSummary {
  const totalUnits = getProgramRuleForProfile(profile).totalUnits;
  const completedCourseCount = profile.completedCourses.length;
  const completedUnits = completedCourseCount * STANDARD_COURSE_UNITS;
  const remainingUnits = Math.max(totalUnits - completedUnits, 0);
  const totalCourseCount = Math.ceil(totalUnits / STANDARD_COURSE_UNITS);
  const remainingCourseCount = Math.max(totalCourseCount - completedCourseCount, 0);

  return {
    totalUnits,
    completedUnits,
    remainingUnits,
    totalCourseCount,
    completedCourseCount,
    remainingCourseCount
  };
}
