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
    targetGpa: 6.2,
    preferredWorkload: "Balanced"
  });

  assert.equal(result.recommendedCourses[0].course.code, "ECON2010");
});

test("recommends ECON2020 after ECON1020 is completed", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.0,
    completedCourses: ["ECON1020"],
    targetGpa: 6.2,
    preferredWorkload: "Balanced"
  });

  assert.ok(result.recommendedCourses.some((item) => item.course.code === "ECON2020"));
});

test("adds prerequisite warning when a recommended course is missing prerequisites", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.0,
    completedCourses: ["ECON1010"],
    targetGpa: 6.2,
    preferredWorkload: "Balanced"
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
    targetGpa: 6.0,
    preferredWorkload: "Balanced"
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
    targetGpa: 6.3,
    preferredWorkload: "Balanced"
  });

  assert.ok(!result.recommendedCourses.some((item) => item.course.code === "ECON2010"));
  assert.ok(result.warnings.some((warning) => warning.includes("high-math courses")));
});

test("prioritises core courses for graduation progress", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.1,
    completedCourses: ["ECON1010", "ECON1020", "ECON1050"],
    targetGpa: 6.2,
    preferredWorkload: "Balanced"
  });

  const topCodes = result.recommendedCourses.slice(0, 2).map((item) => item.course.code);

  assert.deepEqual(new Set(topCodes), new Set(["ECON2010", "ECON2020"]));
  assert.ok(result.reasons.some((reason) => reason.includes("Core and quantitative requirements")));
});

test("returns estimated semester workload", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 5.9,
    completedCourses: ["ECON1010", "ECON1020", "ECON1050"],
    targetGpa: 6.2,
    preferredWorkload: "Light"
  });

  assert.equal(result.estimatedSemesterWorkload.preferredWorkload, "Light");
  assert.ok(result.estimatedSemesterWorkload.totalCourses > 0);
  assert.ok(result.estimatedSemesterWorkload.totalUnits > 0);
  assert.ok(result.estimatedSemesterWorkload.workloadScore > 0);
});

test("does not recommend more than two high math courses in the same semester", () => {
  const highMathCourses: Course[] = [
    {
      code: "ECON3001",
      name: "Advanced Econometrics A",
      units: 2,
      level: 3,
      category: "Economics Elective",
      difficulty: 4,
      mathIntensity: 4,
      examWeight: 60,
      assignmentWeight: 40,
      groupWork: false,
      prerequisites: [],
      semester: "Both",
      description: "Mock high math course A."
    },
    {
      code: "ECON3002",
      name: "Advanced Econometrics B",
      units: 2,
      level: 3,
      category: "Economics Elective",
      difficulty: 4,
      mathIntensity: 5,
      examWeight: 60,
      assignmentWeight: 40,
      groupWork: false,
      prerequisites: [],
      semester: "Both",
      description: "Mock high math course B."
    }
  ];
  const program: Program = {
    ...uqBachelorOfEconomicsProgram,
    courses: [...uqBachelorOfEconomicsProgram.courses, ...highMathCourses]
  };

  const result = recommendCourses({
    program,
    currentGpa: 6.5,
    completedCourses: ["ECON1010", "ECON1020"],
    targetGpa: 6.7,
    preferredWorkload: "Intensive",
    maxRecommendations: 5
  });
  const highMathCount = result.recommendedCourses.filter(
    (item) => item.course.mathIntensity >= 4
  ).length;

  assert.ok(highMathCount <= 2);
  assert.ok(result.warnings.some((warning) => warning.includes("more than two high-math courses")));
});
