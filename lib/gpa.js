export const gradeOptions = [
  { label: "HD / High Distinction", value: "HD" },
  { label: "D / Distinction", value: "D" },
  { label: "C / Credit", value: "C" },
  { label: "P / Pass", value: "P" },
  { label: "F / Fail", value: "F" }
];

export const scaleOptions = {
  seven: {
    label: "7 分制 GPA",
    shortLabel: "7.0",
    resultLabel: "平均 GPA",
    max: 7,
    helper: "适合使用 7 分制 GPA 的澳洲大学或课程。",
    gradeMap: { HD: 7, D: 6, C: 5, P: 4, F: 0 },
    scoreBands: [
      { min: 85, value: 7, label: "85+ = 7" },
      { min: 75, value: 6, label: "75-84 = 6" },
      { min: 65, value: 5, label: "65-74 = 5" },
      { min: 50, value: 4, label: "50-64 = 4" },
      { min: 0, value: 0, label: "<50 = 0" }
    ]
  },
  four: {
    label: "4 分制 GPA",
    shortLabel: "4.0",
    resultLabel: "平均 GPA",
    max: 4,
    helper: "适合使用 4 分制或需要 4.0 口径估算的学校。",
    gradeMap: { HD: 4, D: 3, C: 2, P: 1, F: 0 },
    scoreBands: [
      { min: 85, value: 4, label: "85+ = 4" },
      { min: 75, value: 3, label: "75-84 = 3" },
      { min: 65, value: 2, label: "65-74 = 2" },
      { min: 50, value: 1, label: "50-64 = 1" },
      { min: 0, value: 0, label: "<50 = 0" }
    ]
  },
  wam: {
    label: "WAM / 加权平均分",
    shortLabel: "WAM",
    resultLabel: "WAM",
    max: 100,
    helper: "适合更看重 Weighted Average Mark 的学校和申请场景。",
    gradeMap: { HD: 90, D: 80, C: 70, P: 55, F: 40 },
    scoreBands: []
  }
};

export function getScale(scaleKey) {
  return scaleOptions[scaleKey] ?? scaleOptions.seven;
}

export function scoreToResult(score, scaleKey) {
  const numericScore = Number(score);
  const scale = getScale(scaleKey);

  if (Number.isNaN(numericScore)) {
    return 0;
  }

  if (scaleKey === "wam") {
    return Math.min(Math.max(numericScore, 0), 100);
  }

  return scale.scoreBands.find((band) => numericScore >= band.min)?.value ?? 0;
}

export function gradeToResult(grade, scaleKey) {
  const scale = getScale(scaleKey);
  return scale.gradeMap[grade] ?? 0;
}

export function courseToResult(course, scaleKey) {
  return course.inputMode === "score"
    ? scoreToResult(course.score, scaleKey)
    : gradeToResult(course.grade, scaleKey);
}

export function calculateWeightedResult(courses, scaleKey) {
  const totals = courses.reduce(
    (acc, course) => {
      const credits = Number(course.credits) || 0;
      const result = courseToResult(course, scaleKey);

      return {
        points: acc.points + result * credits,
        credits: acc.credits + credits
      };
    },
    { points: 0, credits: 0 }
  );

  if (totals.credits === 0) {
    return 0;
  }

  return totals.points / totals.credits;
}

export function formatResult(value, scaleKey) {
  return scaleKey === "wam" ? value.toFixed(1) : value.toFixed(2);
}

export function resultTone(value, scaleKey) {
  if (scaleKey === "wam") {
    if (value >= 65) return "good";
    if (value >= 50) return "default";
    return "warn";
  }

  const scale = getScale(scaleKey);
  if (value >= scale.max * 0.72) return "good";
  if (value >= scale.max * 0.5) return "default";
  return "warn";
}
