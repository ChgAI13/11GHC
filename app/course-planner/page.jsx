"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Sparkles,
  Target,
  UserRound
} from "lucide-react";
import { uqBachelorOfEconomicsCourses } from "@/data/courses";
import {
  recommendCourses,
  uqBachelorOfEconomicsProgram
} from "@/lib/recommendationEngine";
import { useProfile } from "@/components/ProfileProvider";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";

function formatCourseMeta(course) {
  return `Level ${course.level} · ${course.units} units · ${course.category}`;
}

function getProfileIssues(profile) {
  const currentGpaValue = Number(profile.currentGpa);
  const targetGpaValue = Number(profile.targetGpa);

  if (!Number.isFinite(currentGpaValue) || profile.currentGpa.trim() === "") {
    return "请先到 Academic Profile 填写 Current GPA。";
  }

  if (!Number.isFinite(targetGpaValue) || profile.targetGpa.trim() === "") {
    return "请先到 Academic Profile 填写 Target GPA。";
  }

  if (profile.completedCourses.length === 0) {
    return "请先到 Academic Profile 选择至少一门已完成课程。";
  }

  return "";
}

export default function CoursePlannerPage() {
  const { profile } = useProfile();
  const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false);
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  const completedCourseDetails = useMemo(() => {
    const completedCourseSet = new Set(profile.completedCourses);

    return uqBachelorOfEconomicsCourses.filter((course) =>
      completedCourseSet.has(course.code)
    );
  }, [profile.completedCourses]);

  useEffect(() => {
    if (!hasGeneratedPlan) {
      return;
    }

    const profileIssue = getProfileIssues(profile);

    if (profileIssue) {
      setFormError(profileIssue);
      setResult(null);
      return;
    }

    setResult(
      recommendCourses({
        program: uqBachelorOfEconomicsProgram,
        currentGpa: Number(profile.currentGpa),
        completedCourses: profile.completedCourses,
        targetGpa: Number(profile.targetGpa),
        preferredWorkload: profile.preferredWorkload
      })
    );
    setFormError("");
  }, [profile, hasGeneratedPlan]);

  function generatePlan(event) {
    event.preventDefault();

    const profileIssue = getProfileIssues(profile);

    if (profileIssue) {
      setFormError(profileIssue);
      setResult(null);
      setHasGeneratedPlan(false);
      return;
    }

    const nextResult = recommendCourses({
      program: uqBachelorOfEconomicsProgram,
      currentGpa: Number(profile.currentGpa),
      completedCourses: profile.completedCourses,
      targetGpa: Number(profile.targetGpa),
      preferredWorkload: profile.preferredWorkload
    });

    setResult(nextResult);
    setFormError("");
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
              课程推荐现在统一读取 Academic Profile，再交给本地规则引擎生成下学期计划。
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
              <UserRound className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                Academic Profile
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                这里不再重复输入数据。请先在 Profile 保存你的学习信息。
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className={`${softPanelClass} p-4`}>
              <p className="text-xs font-medium uppercase text-[#86868b]">Program</p>
              <p className="mt-2 text-base font-semibold text-[#1d1d1f]">{profile.program}</p>
              <p className="mt-1 text-sm text-[#6e6e73]">{profile.university}</p>
            </div>
            <div className={`${softPanelClass} p-4`}>
              <p className="text-xs font-medium uppercase text-[#86868b]">Expected Graduation</p>
              <p className="mt-2 text-base font-semibold text-[#1d1d1f]">
                {profile.expectedGraduationSemester || "Not set"}
              </p>
              <p className="mt-1 text-sm text-[#6e6e73]">来自 Academic Profile</p>
            </div>
            <div className={`${softPanelClass} p-4`}>
              <p className="text-xs font-medium uppercase text-[#86868b]">Current GPA</p>
              <p className="mt-2 text-3xl font-semibold text-[#1d1d1f]">
                {profile.currentGpa || "-"}
              </p>
            </div>
            <div className={`${softPanelClass} p-4`}>
              <p className="text-xs font-medium uppercase text-[#86868b]">Target GPA</p>
              <p className="mt-2 text-3xl font-semibold text-[#1d1d1f]">
                {profile.targetGpa || "-"}
              </p>
            </div>
            <div className={`${softPanelClass} p-4`}>
              <p className="text-xs font-medium uppercase text-[#86868b]">Preferred Workload</p>
              <p className="mt-2 text-3xl font-semibold text-[#1d1d1f]">
                {profile.preferredWorkload}
              </p>
            </div>
            <div className={`${softPanelClass} p-4`}>
              <p className="text-xs font-medium uppercase text-[#86868b]">Completed Courses</p>
              <p className="mt-2 text-3xl font-semibold text-[#1d1d1f]">
                {profile.completedCourses.length}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-[#e5e5ea] bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#1d1d1f]">已完成课程</p>
              <Link
                href="/profile"
                className="rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-xs font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
              >
                Edit Profile
              </Link>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {completedCourseDetails.length ? (
                completedCourseDetails.map((course) => (
                  <span
                    key={course.code}
                    className="rounded-full border border-[#e5e5ea] bg-[#fbfbfd] px-3 py-1.5 text-xs font-semibold text-[#1d1d1f]"
                    title={course.name}
                  >
                    {course.code}
                  </span>
                ))
              ) : (
                <p className="text-sm leading-6 text-[#86868b]">
                  还没有选择已完成课程。请先完善 Academic Profile。
                </p>
              )}
            </div>
          </div>

          {formError ? (
            <div className="mt-5 rounded-lg border border-[#fed7aa] bg-[#fff7ed] px-4 py-3 text-sm leading-6 text-[#9a3412]">
              {formError}{" "}
              <Link href="/profile" className="font-semibold underline underline-offset-4">
                打开 Academic Profile
              </Link>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Generate Semester Plan
            </button>
            <Link
              href="/profile"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Edit Academic Profile
            </Link>
          </div>
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
              {result ? result.reason : "点击 Generate Semester Plan 后显示推荐总结。"}
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">
                  Estimated Semester Workload
                </p>
                <p className="mt-1 text-3xl font-semibold tracking-normal text-[#1d1d1f]">
                  {result ? result.estimatedSemesterWorkload.label : "-"}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>

            {result ? (
              <div className="mt-4 grid gap-2 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
                <p>{result.estimatedSemesterWorkload.summary}</p>
                <p>
                  Preferred: {result.estimatedSemesterWorkload.preferredWorkload} · Units:{" "}
                  {result.estimatedSemesterWorkload.totalUnits} · Workload Score:{" "}
                  {result.estimatedSemesterWorkload.workloadScore}
                </p>
              </div>
            ) : (
              <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#86868b]">
                Generate a semester plan to estimate workload.
              </p>
            )}
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
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">Reasons</h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              推荐引擎给出的整体判断依据。
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {result?.reasons.length ? (
            result.reasons.map((reason) => (
              <p key={reason} className={`${softPanelClass} p-4 text-sm leading-6 text-[#6e6e73]`}>
                {reason}
              </p>
            ))
          ) : (
            <div className={`${softPanelClass} p-5 text-sm leading-6 text-[#6e6e73]`}>
              生成学期计划后，这里会显示推荐原因。
            </div>
          )}
        </div>
      </section>

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
              推荐结果来自 Academic Profile、本地 Mock Data 和规则引擎。
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
              先保存 Academic Profile，然后点击 Generate Semester Plan 生成推荐课程。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
