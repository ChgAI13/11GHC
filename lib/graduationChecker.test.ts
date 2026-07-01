import assert from "node:assert/strict";
import test from "node:test";
import { uqBachelorOfEconomicsCourses } from "../data/courses.ts";
import { uqBachelorOfEconomicsGraduationRules } from "../data/graduationRules.ts";
import { checkGraduation } from "./graduationChecker.ts";
import { DEFAULT_ACADEMIC_PROFILE } from "./profile.ts";

test("checks completed and remaining graduation requirements", () => {
  const result = checkGraduation(
    {
      ...DEFAULT_ACADEMIC_PROFILE,
      currentGpa: "5.80",
      completedCourses: ["ECON1010", "ECON1020", "ECON1050", "ECON1310"]
    },
    uqBachelorOfEconomicsCourses,
    uqBachelorOfEconomicsGraduationRules
  );

  assert.equal(result.totalCompletedUnits, 8);
  assert.equal(result.missingUnits, 40);
  assert.ok(result.overallProgress > 0);
  assert.ok(
    result.remainingRequirements.some(
      (requirement) => requirement.key === "core-courses"
    )
  );
  assert.ok(result.missingCourses.some((course) => course.code === "ECON2010"));
});

test("marks requirements as completed when enough matching units exist", () => {
  const result = checkGraduation(
    {
      ...DEFAULT_ACADEMIC_PROFILE,
      completedCourses: ["ECON1200", "CHIN2600"]
    },
    uqBachelorOfEconomicsCourses,
    uqBachelorOfEconomicsGraduationRules
  );

  assert.ok(
    result.completedRequirements.some(
      (requirement) => requirement.key === "electives"
    )
  );
});

test("reports prerequisite warnings for inconsistent completed courses", () => {
  const result = checkGraduation(
    {
      ...DEFAULT_ACADEMIC_PROFILE,
      completedCourses: ["ECON2010"]
    },
    uqBachelorOfEconomicsCourses,
    uqBachelorOfEconomicsGraduationRules
  );

  assert.ok(
    result.prerequisiteWarnings.some((warning) =>
      warning.includes("ECON1010")
    )
  );
});
