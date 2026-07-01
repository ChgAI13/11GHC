import assert from "node:assert/strict";
import test from "node:test";
import type { Course } from "../data/courses.ts";
import {
  recommendCourses,
  type Program,
  uqBachelorOfEconomicsProgram
} from "./recommendationEngine.ts";

test("recommends ECON2010 after ECON1010 is completed", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.1,
    completedCourses: ["ECON1010", "ECON1050"],
    targetGpa: 6.2
  });

  assert.equal(result.recommendedCourses[0].course.code, "ECON2010");
});

test("recommends ECON2020 after ECON1020 is completed", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.0,
    completedCourses: ["ECON1020"],
    targetGpa: 6.2
  });

  assert.ok(result.recommendedCourses.some((item) => item.course.code === "ECON2020"));
});

test("adds prerequisite warning when a recommended course is missing prerequisites", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.0,
    completedCourses: ["ECON1010"],
    targetGpa: 6.2
  });

  assert.ok(result.recommendedCourses.some((item) => item.course.code === "ECON2010"));
  assert.ok(result.warnings.some((warning) => warning.includes("ECON2010")));
  assert.ok(result.warnings.some((warning) => warning.includes("ECON1050")));
});

test("avoids difficulty 5 courses when GPA is below 5.5", () => {
  const difficultCourse: Course = {
    code: "ECON3999",
    name: "Advanced Economics Mock Capstone",
    units: 2,
    level: 3,
    category: "Economics Elective",
    difficulty: 5,
    mathIntensity: 3,
    examWeight: 70,
    assignmentWeight: 30,
    groupWork: false,
    prerequisites: [],
    semester: "Both",
    description: "Mock difficult economics elective used for recommendation engine tests."
  };
  const program: Program = {
    ...uqBachelorOfEconomicsProgram,
    courses: [...uqBachelorOfEconomicsProgram.courses, difficultCourse]
  };

  const result = recommendCourses({
    program,
    currentGpa: 5.2,
    completedCourses: [],
    targetGpa: 6.0
  });

  assert.ok(!result.recommendedCourses.some((item) => item.course.code === "ECON3999"));
  assert.ok(result.warnings.some((warning) => warning.includes("high-difficulty courses")));
});

test("avoids high math courses when current semester already has two high math courses", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.2,
    completedCourses: ["ECON1010", "ECON1050"],
    currentSemesterCourses: ["ECON1050", "ECON1310"],
    targetGpa: 6.3
  });

  assert.ok(!result.recommendedCourses.some((item) => item.course.code === "ECON2010"));
  assert.ok(result.warnings.some((warning) => warning.includes("high-math courses")));
});
