import assert from "node:assert/strict";
import test from "node:test";
import { uqBachelorOfEconomicsCourses } from "../data/courses.ts";
import { uqBachelorOfEconomics2026ProgramRule } from "../data/programRules.ts";
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
    uqBachelorOfEconomics2026ProgramRule
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
  assert.ok(result.missingCourses.some((course) => course.code === "ECON2101"));
});

test("marks flexible core as completed when enough official flexible core units exist", () => {
  const result = checkGraduation(
    {
      ...DEFAULT_ACADEMIC_PROFILE,
      completedCourses: [
        "ECON1200",
        "ECON2030",
        "ECON2040",
        "ECON2050",
        "ECON2060",
        "ECON2070",
        "ECON2102",
        "ECON2103"
      ]
    },
    uqBachelorOfEconomicsCourses,
    uqBachelorOfEconomics2026ProgramRule
  );

  assert.ok(
    result.completedRequirements.some(
      (requirement) => requirement.key === "flexible-core"
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
    uqBachelorOfEconomics2026ProgramRule
  );

  assert.ok(
    result.prerequisiteWarnings.some((warning) =>
      warning.includes("ECON1010")
    )
  );
});
