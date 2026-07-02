import { getBachelorOfEconomicsCourse, type Course } from "../data/courses.ts";
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
  const completedCourses = profile.completedCourses
    .map((courseCode) => getBachelorOfEconomicsCourse(courseCode))
    .filter((course): course is Course => Boolean(course));
  const completedCourseCount = completedCourses.length;
  const completedUnits = completedCourses.reduce((total, course) => total + course.units, 0);
  const remainingUnits = Math.max(totalUnits - completedUnits, 0);
  const totalCourseCount = Math.ceil(totalUnits / STANDARD_COURSE_UNITS);
  const remainingCourseCount = Math.ceil(remainingUnits / STANDARD_COURSE_UNITS);

  return {
    totalUnits,
    completedUnits,
    remainingUnits,
    totalCourseCount,
    completedCourseCount,
    remainingCourseCount
  };
}
