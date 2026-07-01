import type { Course } from "../data/courses.ts";
import { uqBachelorOfEconomicsCourses } from "../data/courses.ts";

export interface Program {
  university: "University of Queensland";
  name: "Bachelor of Economics";
  courses: Course[];
}

export type CourseInput = string | Pick<Course, "code">;

export interface RecommendationInput {
  program: Program;
  currentGpa: number;
  completedCourses: CourseInput[];
  targetGpa: number;
  currentSemesterCourses?: CourseInput[];
  maxRecommendations?: number;
}

export interface RecommendedCourse {
  course: Course;
  score: number;
  reasons: string[];
  warnings: string[];
}

export interface RecommendationResult {
  recommendedCourses: RecommendedCourse[];
  warnings: string[];
  difficultyScore: number;
  reason: string;
}

interface RecommendationCandidate extends RecommendedCourse {
  excluded: boolean;
}

interface RuleContext {
  input: RecommendationInput;
  completedCourseCodes: Set<string>;
  currentSemesterCourseCodes: Set<string>;
  candidates: RecommendationCandidate[];
  warnings: string[];
}

export const uqBachelorOfEconomicsProgram: Program = {
  university: "University of Queensland",
  name: "Bachelor of Economics",
  courses: uqBachelorOfEconomicsCourses
};

function normalizeCourseCode(course: CourseInput): string {
  return (typeof course === "string" ? course : course.code).trim().toUpperCase();
}

function normalizeCourseCodes(courses: CourseInput[] = []): Set<string> {
  return new Set(courses.map(normalizeCourseCode).filter(Boolean));
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function findCourse(program: Program, code: string): Course | undefined {
  return program.courses.find((course) => course.code === code);
}

function findCandidate(
  candidates: RecommendationCandidate[],
  code: string
): RecommendationCandidate | undefined {
  return candidates.find((candidate) => candidate.course.code === code);
}

function addReason(candidate: RecommendationCandidate, reason: string, scoreBoost = 0) {
  candidate.reasons.push(reason);
  candidate.score += scoreBoost;
}

function addWarning(context: RuleContext, candidate: RecommendationCandidate, warning: string) {
  candidate.warnings.push(warning);
  context.warnings.push(warning);
}

function createInitialCandidates(input: RecommendationInput): RecommendationCandidate[] {
  const completedCourseCodes = normalizeCourseCodes(input.completedCourses);

  return input.program.courses
    .filter((course) => !completedCourseCodes.has(course.code))
    .map((course) => ({
      course,
      score: 50 - course.difficulty * 5 - course.mathIntensity * 2,
      reasons: ["Course has not been completed yet."],
      warnings: [],
      excluded: false
    }));
}

export function ruleRecommendEcon2010(context: RuleContext) {
  if (!context.completedCourseCodes.has("ECON1010")) {
    return;
  }

  const candidate = findCandidate(context.candidates, "ECON2010");

  if (!candidate || candidate.excluded) {
    return;
  }

  addReason(
    candidate,
    "Completed ECON1010, so ECON2010 is a natural next microeconomics course.",
    45
  );
}

export function ruleRecommendEcon2020(context: RuleContext) {
  if (!context.completedCourseCodes.has("ECON1020")) {
    return;
  }

  const candidate = findCandidate(context.candidates, "ECON2020");

  if (!candidate || candidate.excluded) {
    return;
  }

  addReason(
    candidate,
    "Completed ECON1020, so ECON2020 is a natural next macroeconomics course.",
    45
  );
}

export function ruleAvoidHighDifficultyWhenGpaIsLow(context: RuleContext) {
  if (context.input.currentGpa >= 5.5) {
    return;
  }

  const excludedCourses = context.candidates.filter(
    (candidate) => !candidate.excluded && candidate.course.difficulty >= 5
  );

  excludedCourses.forEach((candidate) => {
    candidate.excluded = true;
  });

  if (excludedCourses.length > 0) {
    context.warnings.push(
      `Current GPA is below 5.5, so high-difficulty courses were avoided: ${excludedCourses
        .map((candidate) => candidate.course.code)
        .join(", ")}.`
    );
  }
}

export function ruleLimitHighMathIntensity(context: RuleContext) {
  const highMathCurrentCourses = [...context.currentSemesterCourseCodes]
    .map((code) => findCourse(context.input.program, code))
    .filter((course): course is Course => Boolean(course))
    .filter((course) => course.mathIntensity >= 4);

  if (highMathCurrentCourses.length < 2) {
    return;
  }

  const excludedCourses = context.candidates.filter(
    (candidate) => !candidate.excluded && candidate.course.mathIntensity >= 4
  );

  excludedCourses.forEach((candidate) => {
    candidate.excluded = true;
  });

  if (excludedCourses.length > 0) {
    context.warnings.push(
      `Current semester already has ${highMathCurrentCourses.length} high-math courses, so additional high-math courses were avoided: ${excludedCourses
        .map((candidate) => candidate.course.code)
        .join(", ")}.`
    );
  }
}

export function ruleCheckPrerequisites(context: RuleContext) {
  context.candidates
    .filter((candidate) => !candidate.excluded)
    .forEach((candidate) => {
      const missingPrerequisites = candidate.course.prerequisites.filter(
        (prerequisite) => !context.completedCourseCodes.has(prerequisite)
      );

      if (missingPrerequisites.length === 0) {
        return;
      }

      candidate.score -= missingPrerequisites.length * 15;
      addReason(candidate, "Prerequisites need to be checked before enrolment.");
      addWarning(
        context,
        candidate,
        `${candidate.course.code} is missing prerequisite(s): ${missingPrerequisites.join(", ")}.`
      );
    });
}

export function ruleTargetGpaPressure(context: RuleContext) {
  const gpaGap = context.input.targetGpa - context.input.currentGpa;

  if (gpaGap <= 0) {
    return;
  }

  context.candidates
    .filter((candidate) => !candidate.excluded)
    .forEach((candidate) => {
      if (candidate.course.difficulty <= 3 && candidate.course.assignmentWeight >= 50) {
        addReason(
          candidate,
          "Target GPA is above current GPA, so lower-risk assignment-heavy courses are preferred.",
          10
        );
      }

      if (gpaGap >= 0.5 && candidate.course.difficulty >= 4) {
        candidate.score -= 8;
        addReason(candidate, "Target GPA gap is meaningful, so higher-risk courses are ranked lower.");
      }
    });
}

function buildReason(recommendedCourses: RecommendedCourse[], warnings: string[]): string {
  if (recommendedCourses.length === 0) {
    return "No suitable courses were recommended under the current rule set.";
  }

  const topCourse = recommendedCourses[0];
  const warningText =
    warnings.length > 0 ? ` ${warnings.length} warning(s) should be reviewed before enrolment.` : "";

  return `Top recommendation is ${topCourse.course.code} because ${topCourse.reasons[0].toLowerCase()}${warningText}`;
}

function calculateDifficultyScore(recommendedCourses: RecommendedCourse[]): number {
  if (recommendedCourses.length === 0) {
    return 0;
  }

  const total = recommendedCourses.reduce(
    (sum, recommendation) =>
      sum + recommendation.course.difficulty * 0.7 + recommendation.course.mathIntensity * 0.3,
    0
  );

  return Number((total / recommendedCourses.length).toFixed(1));
}

export function recommendCourses(input: RecommendationInput): RecommendationResult {
  const maxRecommendations = input.maxRecommendations ?? 3;
  const context: RuleContext = {
    input,
    completedCourseCodes: normalizeCourseCodes(input.completedCourses),
    currentSemesterCourseCodes: normalizeCourseCodes(input.currentSemesterCourses),
    candidates: createInitialCandidates(input),
    warnings: []
  };

  ruleRecommendEcon2010(context);
  ruleRecommendEcon2020(context);
  ruleAvoidHighDifficultyWhenGpaIsLow(context);
  ruleLimitHighMathIntensity(context);
  ruleCheckPrerequisites(context);
  ruleTargetGpaPressure(context);

  const recommendedCourses = context.candidates
    .filter((candidate) => !candidate.excluded)
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      if (first.course.difficulty !== second.course.difficulty) {
        return first.course.difficulty - second.course.difficulty;
      }

      return first.course.code.localeCompare(second.course.code);
    })
    .slice(0, maxRecommendations)
    .map(({ excluded, ...candidate }) => ({
      ...candidate,
      score: Number(candidate.score.toFixed(1)),
      reasons: unique(candidate.reasons),
      warnings: unique(candidate.warnings)
    }));

  const warnings = unique(context.warnings);

  return {
    recommendedCourses,
    warnings,
    difficultyScore: calculateDifficultyScore(recommendedCourses),
    reason: buildReason(recommendedCourses, warnings)
  };
}
