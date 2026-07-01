"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Sparkles,
  Target
} from "lucide-react";
import { uqBachelorOfEconomicsCourses } from "@/data/courses";
import {
  recommendCourses,
  uqBachelorOfEconomicsProgram
} from "@/lib/recommendationEngine";
import { load, save } from "@/lib/storage";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";

const DEFAULT_COURSE_PLANNER_FORM = {
  currentGpa: "5.80",
  targetGpa: "6.20",
  completedCourses: ["ECON1010", "ECON1050"],
  hasGeneratedPlan: false
};

function formatCourseMeta(course) {
  return `Level ${course.level} · ${course.units} units · ${course.category}`;
}

export default function CoursePlannerPage() {
  const [currentGpa, setCurrentGpa] = useState(DEFAULT_COURSE_PLANNER_FORM.currentGpa);
  const [targetGpa, setTargetGpa] = useState(DEFAULT_COURSE_PLANNER_FORM.targetGpa);
  const [completedCourses, setCompletedCourses] = useState(
    DEFAULT_COURSE_PLANNER_FORM.completedCourses
  );
  const [hasGeneratedPlan, setHasGeneratedPlan] = useState(
    DEFAULT_COURSE_PLANNER_FORM.hasGeneratedPlan
  );
  const [hasLoadedSavedValues, setHasLoadedSavedValues] = useState(false);
  const [result, setResult] = useState(null);

  const completedCourseSet = useMemo(() => new Set(completedCourses), [completedCourses]);

  useEffect(() => {
    const savedValues = load("coursePlanner", DEFAULT_COURSE_PLANNER_FORM);

    if (typeof savedValues.currentGpa === "string") {
      setCurrentGpa(savedValues.currentGpa);
    }

    if (typeof savedValues.targetGpa === "string") {
      setTargetGpa(savedValues.targetGpa);
    }

    if (Array.isArray(savedValues.completedCourses)) {
      setCompletedCourses(
        savedValues.completedCourses.filter((courseCode) => typeof courseCode === "string")
      );
    }

    if (typeof savedValues.hasGeneratedPlan === "boolean") {
      setHasGeneratedPlan(savedValues.hasGeneratedPlan);
    }

    setHasLoadedSavedValues(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedSavedValues) {
      return;
    }

    save("coursePlanner", {
      currentGpa,
      targetGpa,
      completedCourses,
      hasGeneratedPlan
    });
  }, [currentGpa, targetGpa, completedCourses, hasGeneratedPlan, hasLoadedSavedValues]);

  useEffect(() => {
    if (!hasLoadedSavedValues || !hasGeneratedPlan) {
      return;
    }

    setResult(
      recommendCourses({
        program: uqBachelorOfEconomicsProgram,
        currentGpa: Number(currentGpa) || 0,
        completedCourses,
        targetGpa: Number(targetGpa) || 0
      })
    );
  }, [currentGpa, targetGpa, completedCourses, hasGeneratedPlan, hasLoadedSavedValues]);

  function toggleCompletedCourse(courseCode) {
    setCompletedCourses((currentCourses) =>
      currentCourses.includes(courseCode)
        ? currentCourses.filter((code) => code !== courseCode)
        : [...currentCourses, courseCode]
    );
  }

  function generatePlan(event) {
    event.preventDefault();

    const nextResult = recommendCourses({
      program: uqBachelorOfEconomicsProgram,
      currentGpa: Number(currentGpa) || 0,
      completedCourses,
      targetGpa: Number(targetGpa) || 0
    });

    setResult(nextResult);
    setHasGeneratedPlan(true);
  }

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
              <GraduationCap className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
              UQ Bachelor of Economics
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#1d1d1f] sm:text-6xl">
              Course Planner
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg">
              使用本地 Mock Data 和规则引擎，根据当前 GPA、已完成课程和目标 GPA 推荐下一批课程。
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <p className="text-sm font-medium text-[#6e6e73]">Recommendation Engine</p>
            <p className="mt-2 text-2xl font-semibold tracking-normal text-[#1d1d1f]">
              Version 1
            </p>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              全部使用本地规则，不连接数据库，不连接 OpenAI。
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <form className={`${panelClass} p-5 sm:p-6`} onSubmit={generatePlan}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
              <ClipboardList className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                输入规划信息
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                第一版只支持 University of Queensland · Bachelor of Economics。
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">Current GPA</span>
              <input
                className="mt-2 h-14 rounded-lg border border-[#e5e5ea] bg-white px-4 text-lg font-semibold text-[#1d1d1f] outline-none transition placeholder:text-[#c7c7cc] focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10"
                type="number"
                min="0"
                max="7"
                step="0.01"
                inputMode="decimal"
                value={currentGpa}
                onChange={(event) => setCurrentGpa(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">Target GPA</span>
              <input
                className="mt-2 h-14 rounded-lg border border-[#e5e5ea] bg-white px-4 text-lg font-semibold text-[#1d1d1f] outline-none transition placeholder:text-[#c7c7cc] focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10"
                type="number"
                min="0"
                max="7"
                step="0.01"
                inputMode="decimal"
                value={targetGpa}
                onChange={(event) => setTargetGpa(event.target.value)}
              />
            </label>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Completed Courses</p>
                <p className="mt-1 text-sm text-[#86868b]">
                  已选择 {completedCourses.length} 门课程
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-xs font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7]"
                onClick={() => setCompletedCourses([])}
              >
                Clear
              </button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {uqBachelorOfEconomicsCourses.map((course) => {
                const checked = completedCourseSet.has(course.code);

                return (
                  <label
                    key={course.code}
                    className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${
                      checked
                        ? "border-[#51247a] bg-[#fbf8ff]"
                        : "border-[#e5e5ea] bg-[#fbfbfd] hover:bg-white"
                    }`}
                  >
                    <input
                      className="mt-1 h-4 w-4 accent-[#51247a]"
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCompletedCourse(course.code)}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[#1d1d1f]">
                        {course.code}
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-[#6e6e73]">
                        {course.name}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62] sm:w-auto"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Generate Plan
          </button>
        </form>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <div className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Difficulty Score</p>
                <p className="mt-1 text-4xl font-semibold tracking-normal text-[#1d1d1f]">
                  {result ? result.difficultyScore : "-"}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <Target className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              {result ? result.reason : "点击 Generate Plan 后显示推荐总结。"}
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Warnings</p>
                <p className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                  {result ? result.warnings.length : 0}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {result?.warnings.length ? (
                result.warnings.map((warning) => (
                  <p key={warning} className={`${softPanelClass} p-3 text-sm leading-6 text-[#6e6e73]`}>
                    {warning}
                  </p>
                ))
              ) : (
                <p className="text-sm leading-6 text-[#86868b]">
                  暂无 warning。生成推荐后这里会显示 prerequisite 或风险提示。
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>

      <section className={`${panelClass} p-5 sm:p-6`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
              Recommended Courses
            </h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              推荐结果来自本地 Mock Data 和规则引擎。
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {result ? (
            result.recommendedCourses.map((recommendation) => (
              <article key={recommendation.course.code} className={`${softPanelClass} p-4`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-lg font-semibold tracking-normal text-[#1d1d1f]">
                      {recommendation.course.code} · {recommendation.course.name}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
                      {formatCourseMeta(recommendation.course)}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#6e6e73]">
                      {recommendation.course.description}
                    </p>
                  </div>

                  <div className="grid min-w-40 grid-cols-2 gap-2 sm:text-right">
                    <div>
                      <p className="text-xs font-medium text-[#86868b]">Difficulty</p>
                      <p className="text-xl font-semibold text-[#1d1d1f]">
                        {recommendation.course.difficulty}/5
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#86868b]">Math</p>
                      <p className="text-xl font-semibold text-[#1d1d1f]">
                        {recommendation.course.mathIntensity}/5
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f]">Reasons</p>
                    <div className="mt-2 grid gap-2">
                      {recommendation.reasons.map((reason) => (
                        <p key={reason} className="flex gap-2 text-sm leading-6 text-[#6e6e73]">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#51247a]" aria-hidden="true" />
                          {reason}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f]">Course Weights</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="rounded-lg border border-[#e5e5ea] bg-white p-3">
                        <p className="text-xs font-medium text-[#86868b]">Exam</p>
                        <p className="text-lg font-semibold text-[#1d1d1f]">
                          {recommendation.course.examWeight}%
                        </p>
                      </div>
                      <div className="rounded-lg border border-[#e5e5ea] bg-white p-3">
                        <p className="text-xs font-medium text-[#86868b]">Assignment</p>
                        <p className="text-lg font-semibold text-[#1d1d1f]">
                          {recommendation.course.assignmentWeight}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className={`${softPanelClass} p-5 text-sm leading-6 text-[#6e6e73]`}>
              输入 GPA 和已完成课程后，点击 Generate Plan 生成推荐课程。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
