import type { Course } from "../data/courses.ts";
import { uqBachelorOfEconomicsCourses } from "../data/courses.ts";

export interface Program {
  university: "University of Queensland";
  name: "Bachelor of Economics";
  courses: Course[];
}

export type CourseInput = string | Pick<Course, "code">;

export type PreferredWorkload = "Light" | "Balanced" | "Intensive";

export interface RecommendationInput {
  program: Program;
  currentGpa: number;
  completedCourses: CourseInput[];
  targetGpa: number;
  preferredWorkload?: PreferredWorkload;
  currentSemesterCourses?: CourseInput[];
  maxRecommendations?: number;
}

export interface RecommendedCourse {
  course: Course;
  score: number;
  reasons: string[];
  warnings: string[];
}

export interface EstimatedSemesterWorkload {
  preferredWorkload: PreferredWorkload;
  totalCourses: number;
  totalUnits: number;
  averageDifficulty: number;
  averageMathIntensity: number;
  highMathCourseCount: number;
  workloadScore: number;
  label: "Light" | "Balanced" | "Heavy";
  summary: string;
}

export interface RecommendationResult {
  recommendedCourses: RecommendedCourse[];
  reasons: string[];
  warnings: string[];
  difficultyScore: number;
  estimatedSemesterWorkload: EstimatedSemesterWorkload;
  reason: string;
}

interface RecommendationCandidate extends RecommendedCourse {
  excluded: boolean;
}

interface RuleContext {
  input: RequiredRecommendationInput;
  completedCourseCodes: Set<string>;
  currentSemesterCourseCodes: Set<string>;
  candidates: RecommendationCandidate[];
  warnings: string[];
  reasons: string[];
}

interface RequiredRecommendationInput extends RecommendationInput {
  preferredWorkload: PreferredWorkload;
  maxRecommendations: number;
}

const CORE_CATEGORIES = new Set(["Economics Core", "Quantitative Core"]);

export const uqBachelorOfEconomicsProgram: Program = {
  university: "University of Queensland",
  name: "Bachelor of Economics",
  courses: uqBachelorOfEconomicsCourses
};

function normalizeInput(input: RecommendationInput): RequiredRecommendationInput {
  const preferredWorkload = input.preferredWorkload ?? "Balanced";

  return {
    ...input,
    preferredWorkload,
    maxRecommendations: input.maxRecommendations ?? getDefaultRecommendationCount(preferredWorkload)
  };
}

function getDefaultRecommendationCount(preferredWorkload: PreferredWorkload): number {
  if (preferredWorkload === "Light") {
    return 3;
  }

  if (preferredWorkload === "Intensive") {
    return 4;
  }

  return 4;
}

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

function createInitialCandidates(input: RequiredRecommendationInput): RecommendationCandidate[] {
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

export function checkPrerequisite(course: Course, completedCourseCodes: Set<string>): string[] {
  return course.prerequisites.filter((prerequisite) => !completedCourseCodes.has(prerequisite));
}

export function recommendProgressionCourses(context: RuleContext) {
  if (context.completedCourseCodes.has("ECON1010")) {
    const candidate = findCandidate(context.candidates, "ECON2010");

    if (candidate && !candidate.excluded) {
      addReason(
        candidate,
        "Completed ECON1010, so ECON2010 is a natural next microeconomics course.",
        45
      );
      context.reasons.push("ECON1010 completion unlocks ECON2010 as the next microeconomics step.");
    }
  }

  if (context.completedCourseCodes.has("ECON1020")) {
    const candidate = findCandidate(context.candidates, "ECON2020");

    if (candidate && !candidate.excluded) {
      addReason(
        candidate,
        "Completed ECON1020, so ECON2020 is a natural next macroeconomics course.",
        45
      );
      context.reasons.push("ECON1020 completion unlocks ECON2020 as the next macroeconomics step.");
    }
  }
}

export function recommendCoreCourses(context: RuleContext) {
  context.candidates
    .filter((candidate) => !candidate.excluded)
    .forEach((candidate) => {
      if (!CORE_CATEGORIES.has(candidate.course.category)) {
        return;
      }

      const missingPrerequisites = checkPrerequisite(candidate.course, context.completedCourseCodes);
      const prerequisitePenalty = missingPrerequisites.length * 8;

      addReason(
        candidate,
        "Core Economics requirements are prioritised to protect graduation progress.",
        24 - prerequisitePenalty
      );
    });

  context.reasons.push("Core and quantitative requirements are ranked ahead of general electives.");
}

export function avoidHighDifficultyCourses(context: RuleContext) {
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

export function checkPrerequisites(context: RuleContext) {
  context.candidates
    .filter((candidate) => !candidate.excluded)
    .forEach((candidate) => {
      const missingPrerequisites = checkPrerequisite(candidate.course, context.completedCourseCodes);

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

export function applyTargetGpaPressure(context: RuleContext) {
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

function sortCandidates(candidates: RecommendationCandidate[]): RecommendationCandidate[] {
  return [...candidates]
    .filter((candidate) => !candidate.excluded)
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      if (first.course.difficulty !== second.course.difficulty) {
        return first.course.difficulty - second.course.difficulty;
      }

      return first.course.code.localeCompare(second.course.code);
    });
}

export function enforceMathIntensityLimit(
  sortedCandidates: RecommendationCandidate[],
  context: RuleContext
): RecommendationCandidate[] {
  const selected: RecommendationCandidate[] = [];
  const currentHighMathCount = [...context.currentSemesterCourseCodes]
    .map((code) => findCourse(context.input.program, code))
    .filter((course): course is Course => Boolean(course))
    .filter((course) => course.mathIntensity >= 4).length;
  let highMathCount = currentHighMathCount;
  const skippedHighMathCourses: string[] = [];

  for (const candidate of sortedCandidates) {
    if (selected.length >= context.input.maxRecommendations) {
      break;
    }

    if (candidate.course.mathIntensity >= 4 && highMathCount >= 2) {
      skippedHighMathCourses.push(candidate.course.code);
      continue;
    }

    if (candidate.course.mathIntensity >= 4) {
      highMathCount += 1;
    }

    selected.push(candidate);
  }

  if (skippedHighMathCourses.length > 0) {
    context.warnings.push(
      `To avoid more than two high-math courses in one semester, these courses were not selected: ${unique(
        skippedHighMathCourses
      ).join(", ")}.`
    );
  }

  return selected;
}

export function calculateDifficulty(recommendedCourses: RecommendedCourse[]): number {
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

export function estimateWorkload(
  recommendedCourses: RecommendedCourse[],
  preferredWorkload: PreferredWorkload
): EstimatedSemesterWorkload {
  const totalCourses = recommendedCourses.length;
  const totalUnits = recommendedCourses.reduce(
    (sum, recommendation) => sum + recommendation.course.units,
    0
  );
  const averageDifficulty =
    totalCourses === 0
      ? 0
      : Number(
          (
            recommendedCourses.reduce(
              (sum, recommendation) => sum + recommendation.course.difficulty,
              0
            ) / totalCourses
          ).toFixed(1)
        );
  const averageMathIntensity =
    totalCourses === 0
      ? 0
      : Number(
          (
            recommendedCourses.reduce(
              (sum, recommendation) => sum + recommendation.course.mathIntensity,
              0
            ) / totalCourses
          ).toFixed(1)
        );
  const highMathCourseCount = recommendedCourses.filter(
    (recommendation) => recommendation.course.mathIntensity >= 4
  ).length;
  const workloadScore = Number(
    (totalCourses * 1.2 + averageDifficulty * 0.9 + averageMathIntensity * 0.7).toFixed(1)
  );
  const label = workloadScore >= 9 ? "Heavy" : workloadScore >= 6 ? "Balanced" : "Light";

  return {
    preferredWorkload,
    totalCourses,
    totalUnits,
    averageDifficulty,
    averageMathIntensity,
    highMathCourseCount,
    workloadScore,
    label,
    summary: `${label} semester workload: ${totalCourses} course(s), ${totalUnits} unit(s), ${highMathCourseCount} high-math course(s).`
  };
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

function toRecommendedCourse(candidate: RecommendationCandidate): RecommendedCourse {
  return {
    course: candidate.course,
    score: Number(candidate.score.toFixed(1)),
    reasons: unique(candidate.reasons),
    warnings: unique(candidate.warnings)
  };
}

export function recommendCourses(input: RecommendationInput): RecommendationResult {
  const normalizedInput = normalizeInput(input);
  const context: RuleContext = {
    input: normalizedInput,
    completedCourseCodes: normalizeCourseCodes(normalizedInput.completedCourses),
    currentSemesterCourseCodes: normalizeCourseCodes(normalizedInput.currentSemesterCourses),
    candidates: createInitialCandidates(normalizedInput),
    warnings: [],
    reasons: []
  };

  recommendProgressionCourses(context);
  recommendCoreCourses(context);
  avoidHighDifficultyCourses(context);
  checkPrerequisites(context);
  applyTargetGpaPressure(context);

  const selectedCandidates = enforceMathIntensityLimit(sortCandidates(context.candidates), context);
  const recommendedCourses = selectedCandidates.map(toRecommendedCourse);
  const warnings = unique(context.warnings);
  const reasons = unique([
    ...context.reasons,
    ...recommendedCourses.flatMap((recommendation) =>
      recommendation.reasons.map((reason) => `${recommendation.course.code}: ${reason}`)
    )
  ]);

  return {
    recommendedCourses,
    reasons,
    warnings,
    difficultyScore: calculateDifficulty(recommendedCourses),
    estimatedSemesterWorkload: estimateWorkload(
      recommendedCourses,
      normalizedInput.preferredWorkload
    ),
    reason: buildReason(recommendedCourses, warnings)
  };
}

export const ruleRecommendEcon2010 = recommendProgressionCourses;
export const ruleRecommendEcon2020 = recommendProgressionCourses;
export const ruleAvoidHighDifficultyWhenGpaIsLow = avoidHighDifficultyCourses;
export const ruleLimitHighMathIntensity = enforceMathIntensityLimit;
export const ruleCheckPrerequisites = checkPrerequisites;
export const ruleTargetGpaPressure = applyTargetGpaPressure;
