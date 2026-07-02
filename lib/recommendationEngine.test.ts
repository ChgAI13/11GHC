import assert from "node:assert/strict";
import test from "node:test";
import type { Course } from "../data/courses.ts";
import {
  analyzeSemester,
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
    preferredWorkload: "Medium"
  });

  assert.equal(result.recommendedCourses[0].course.code, "ECON2010");
});

test("recommends ECON2020 after ECON1020 is completed", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.0,
    completedCourses: ["ECON1020"],
    targetGpa: 6.2,
    preferredWorkload: "Medium"
  });

  assert.ok(result.recommendedCourses.some((item) => item.course.code === "ECON2020"));
});

test("adds prerequisite warning when a recommended course is missing prerequisites", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 6.0,
    completedCourses: ["ECON1010"],
    targetGpa: 6.2,
    preferredWorkload: "Medium"
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
    estimatedStudyHours: 14,
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
    preferredWorkload: "Medium"
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
    preferredWorkload: "Medium"
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
    preferredWorkload: "Medium"
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
      estimatedStudyHours: 12,
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
      estimatedStudyHours: 12,
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
    preferredWorkload: "Heavy",
    maxRecommendations: 5
  });
  const highMathCount = result.recommendedCourses.filter(
    (item) => item.course.mathIntensity >= 4
  ).length;

  assert.ok(highMathCount <= 2);
  assert.ok(result.warnings.some((warning) => warning.includes("more than two high-math courses")));
});

test("generates the requested medium workload semester plan scenario", () => {
  const result = recommendCourses({
    program: uqBachelorOfEconomicsProgram,
    currentGpa: 5.2,
    completedCourses: ["ECON1010", "ECON1020"],
    targetGpa: 6.0,
    preferredWorkload: "Medium"
  });
  const recommendedCodes = result.recommendedCourses.map((item) => item.course.code);

  assert.ok(recommendedCodes.includes("ECON2010"));
  assert.ok(recommendedCodes.includes("ECON2020"));
  assert.ok(result.difficultyScore > 0);
  assert.ok(result.reasons.length > 0);
  assert.ok(result.warnings.length > 0);
  assert.ok(result.estimatedSemesterWorkload.totalCourses > 0);
  assert.equal(result.estimatedSemesterWorkload.preferredWorkload, "Medium");
});

test("analyses semester risk from planned courses", () => {
  const courses: Course[] = [
    {
      code: "ECON3901",
      name: "Math Heavy Exam Course",
      units: 2,
      level: 3,
      category: "Economics Elective",
      difficulty: 5,
      mathIntensity: 5,
      examWeight: 80,
      assignmentWeight: 20,
      groupWork: false,
      estimatedStudyHours: 14,
      prerequisites: [],
      semester: 1,
      description: "Mock semester analysis course."
    },
    {
      code: "ECON3902",
      name: "Second Math Heavy Exam Course",
      units: 2,
      level: 3,
      category: "Economics Elective",
      difficulty: 4,
      mathIntensity: 5,
      examWeight: 75,
      assignmentWeight: 25,
      groupWork: false,
      estimatedStudyHours: 12,
      prerequisites: [],
      semester: 1,
      description: "Mock semester analysis course."
    }
  ];

  const analysis = analyzeSemester(courses);

  assert.equal(analysis.mathIntensity, 10);
  assert.equal(analysis.estimatedStudyHours, 26);
  assert.ok(analysis.riskLabels.includes("High Risk Semester"));
  assert.ok(analysis.riskLabels.includes("Exam Heavy"));
});
