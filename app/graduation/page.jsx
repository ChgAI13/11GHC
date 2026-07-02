"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Layers3,
  ListChecks,
  Target,
  UserRound
} from "lucide-react";
import { uqBachelorOfEconomicsCourses } from "@/data/courses";
import { getProgramRuleForProfile } from "@/data/programRules";
import { checkGraduation } from "@/lib/graduationChecker";
import {
  recommendCourses,
  uqBachelorOfEconomicsProgram
} from "@/lib/recommendationEngine";
import { useProfile } from "@/components/ProfileProvider";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";

function ProgressBar({ value }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-[#f5f5f7]">
      <div
        className="h-full rounded-full bg-[#51247a] transition-all"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

function RequirementStatusCard({ requirement }) {
  return (
    <article className={`${softPanelClass} p-4`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-base font-semibold text-[#1d1d1f]">{requirement.label}</p>
          <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
            {requirement.description}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[#e5e5ea] bg-white px-3 py-1 text-sm font-semibold text-[#1d1d1f]">
          {requirement.progress}%
        </span>
      </div>

      <div className="mt-4">
        <ProgressBar value={requirement.progress} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium uppercase text-[#86868b]">Completed</p>
          <p className="mt-1 text-lg font-semibold text-[#1d1d1f]">
            {requirement.completedUnits} units
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-[#86868b]">Required</p>
          <p className="mt-1 text-lg font-semibold text-[#1d1d1f]">
            {requirement.requiredUnits} units
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-[#86868b]">Missing</p>
          <p className="mt-1 text-lg font-semibold text-[#1d1d1f]">
            {requirement.missingUnits} units
          </p>
        </div>
      </div>
    </article>
  );
}

function RequirementPillList({ requirements, emptyText }) {
  if (requirements.length === 0) {
    return <p className="text-sm leading-6 text-[#86868b]">{emptyText}</p>;
  }

  return (
    <div className="grid gap-2">
      {requirements.map((requirement) => (
        <div
          key={requirement.key}
          className="flex items-center justify-between gap-3 rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] px-4 py-3"
        >
          <span className="text-sm font-semibold text-[#1d1d1f]">{requirement.label}</span>
          <span className="text-sm font-medium text-[#6e6e73]">
            {requirement.completedUnits}/{requirement.requiredUnits} units
          </span>
        </div>
      ))}
    </div>
  );
}

export default function GraduationCheckerPage() {
  const { profile } = useProfile();
  const programRule = useMemo(() => getProgramRuleForProfile(profile), [profile]);

  const graduationResult = useMemo(
    () =>
      checkGraduation(
        profile,
        uqBachelorOfEconomicsCourses,
        programRule
      ),
    [profile, programRule]
  );

  const recommendationResult = useMemo(
    () =>
      recommendCourses({
        program: uqBachelorOfEconomicsProgram,
        currentGpa: Number(profile.currentGpa) || 0,
        completedCourses: profile.completedCourses,
        targetGpa: Number(profile.targetGpa) || Number(profile.currentGpa) || 0,
        preferredWorkload: profile.preferredWorkload
      }),
    [profile]
  );

  const warnings = [
    ...graduationResult.prerequisiteWarnings,
    ...recommendationResult.warnings
  ];

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
              <ClipboardCheck className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
              Mock Degree Rules
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#1d1d1f] sm:text-6xl">
              Graduation Checker
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg">
              自动读取 Academic Profile，用 Mock UQ Economics 规则检查毕业进度、缺课、缺学分和下一步建议。
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <p className="text-sm font-medium text-[#6e6e73]">Overall Graduation Progress</p>
            <p className="mt-2 text-5xl font-semibold tracking-normal text-[#1d1d1f]">
              {graduationResult.overallProgress}%
            </p>
            <div className="mt-5">
              <ProgressBar value={graduationResult.overallProgress} />
            </div>
            <p className="mt-4 text-sm leading-6 text-[#6e6e73]">
              {graduationResult.totalCompletedUnits}/{graduationResult.totalRequiredUnits} total units completed
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6e6e73]">Program</p>
            <GraduationCap className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-xl font-semibold text-[#1d1d1f]">{profile.program}</p>
          <p className="mt-1 text-sm text-[#6e6e73]">{profile.university}</p>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6e6e73]">Current GPA</p>
            <Target className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-4xl font-semibold text-[#1d1d1f]">
            {profile.currentGpa || "-"}
          </p>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6e6e73]">Completed Courses</p>
            <BookOpen className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-4xl font-semibold text-[#1d1d1f]">
            {profile.completedCourses.length}
          </p>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6e6e73]">Missing Units</p>
            <Layers3 className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-4xl font-semibold text-[#1d1d1f]">
            {graduationResult.missingUnits}
          </p>
        </div>
      </section>

      {profile.completedCourses.length === 0 ? (
        <section className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-5 text-sm leading-6 text-[#9a3412]">
          还没有已完成课程数据。请先到{" "}
          <Link href="/profile" className="font-semibold underline underline-offset-4">
            Academic Profile
          </Link>{" "}
          填写 Current GPA 和 Completed Courses。
        </section>
      ) : null}

      {warnings.length ? (
        <section className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#fff7ed] text-[#c2410c]">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                Warnings
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                包括先修课缺失和推荐课程风险提示。
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {warnings.map((warning) => (
              <p
                key={warning}
                className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm leading-6 text-[#9a3412]"
              >
                {warning}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <section className={`${panelClass} p-5 sm:p-6`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
            <ListChecks className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
              Requirement Status
            </h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              Core Courses、Flexible Core、Electives、Level 1、Level 2、Level 3、Total Units。
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {graduationResult.requirementStatuses.map((requirement) => (
            <RequirementStatusCard key={requirement.key} requirement={requirement} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f0fdf4] text-[#15803d]">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                Completed Requirements
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">已经满足的毕业要求。</p>
            </div>
          </div>
          <div className="mt-5">
            <RequirementPillList
              requirements={graduationResult.completedRequirements}
              emptyText="目前还没有完全满足的要求。继续完成核心课和学分后这里会更新。"
            />
          </div>
        </div>

        <div className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
              <Layers3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                Remaining Requirements
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">还需要继续完成的要求。</p>
            </div>
          </div>
          <div className="mt-5">
            <RequirementPillList
              requirements={graduationResult.remainingRequirements}
              emptyText="所有 Mock requirement 都已满足。"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                Missing Courses
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                根据当前 Mock Course Database 可以明确列出的缺课。
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {graduationResult.missingCourses.length ? (
              graduationResult.missingCourses.map((course) => (
                <article key={course.code} className={`${softPanelClass} p-4`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-base font-semibold text-[#1d1d1f]">
                        {course.code} · {course.name}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
                        Level {course.level} · {course.units} units · {course.category}
                      </p>
                    </div>
                    <span className="w-fit rounded-full border border-[#e5e5ea] bg-white px-3 py-1 text-xs font-semibold text-[#6e6e73]">
                      Semester {course.semester}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <div className={`${softPanelClass} p-5 text-sm leading-6 text-[#6e6e73]`}>
                当前 Mock Course Database 暂无更多可列出的缺课；缺失学分会继续显示在 Missing Units。
              </div>
            )}
          </div>
        </div>

        <aside className={`${panelClass} p-5`}>
          <p className="text-sm font-medium text-[#6e6e73]">Missing Units</p>
          <p className="mt-2 text-5xl font-semibold tracking-normal text-[#1d1d1f]">
            {graduationResult.missingUnits}
          </p>
          <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
            这是基于 Mock total units 的剩余学分估算。真实版本会接入 UQ 官方 degree rules 和 course list。
          </p>
          <Link
            href="/course-planner"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Fix My Degree
          </Link>
          <Link
            href="/profile"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
            Update Academic Profile
          </Link>
        </aside>
      </section>

      <section className={`${panelClass} p-5 sm:p-6`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
            <Target className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
              Recommended Next Courses
            </h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              这里调用现有 Recommendation Engine，根据 Profile 和毕业缺口给出下一步建议。
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {recommendationResult.recommendedCourses.length ? (
            recommendationResult.recommendedCourses.map((recommendation) => (
              <article key={recommendation.course.code} className={`${softPanelClass} p-4`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[#1d1d1f]">
                      {recommendation.course.code} · {recommendation.course.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#6e6e73]">
                      {recommendation.reasons[0] || recommendation.course.description}
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
              </article>
            ))
          ) : (
            <div className={`${softPanelClass} p-5 text-sm leading-6 text-[#6e6e73]`}>
              当前规则没有生成推荐课程。请先完善 Academic Profile。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
