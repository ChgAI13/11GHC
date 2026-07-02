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
import { useLanguage } from "@/components/LanguageProvider";
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

function translateRequirement(requirement, translations) {
  return {
    ...requirement,
    label: translations.labels[requirement.label] ?? requirement.label,
    description: translations.descriptions[requirement.description] ?? requirement.description
  };
}

function translateEngineText(text, t) {
  return t.engineText[text] ?? text;
}

function RequirementStatusCard({ requirement, labels }) {
  const status = translateRequirement(requirement, labels.requirementTranslations);

  return (
    <article className={`${softPanelClass} p-4`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-base font-semibold text-[#1d1d1f]">{status.label}</p>
          <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
            {status.description}
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
          <p className="text-xs font-medium uppercase text-[#86868b]">{labels.completed}</p>
          <p className="mt-1 text-lg font-semibold text-[#1d1d1f]">
            {requirement.completedUnits} units
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-[#86868b]">{labels.required}</p>
          <p className="mt-1 text-lg font-semibold text-[#1d1d1f]">
            {requirement.requiredUnits} units
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase text-[#86868b]">{labels.missing}</p>
          <p className="mt-1 text-lg font-semibold text-[#1d1d1f]">
            {requirement.missingUnits} units
          </p>
        </div>
      </div>
    </article>
  );
}

function RequirementPillList({ requirements, emptyText, requirementTranslations }) {
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
          <span className="text-sm font-semibold text-[#1d1d1f]">
            {translateRequirement(requirement, requirementTranslations).label}
          </span>
          <span className="text-sm font-medium text-[#6e6e73]">
            {requirement.completedUnits}/{requirement.requiredUnits} units
          </span>
        </div>
      ))}
    </div>
  );
}

export default function GraduationCheckerPage() {
  const { messages } = useLanguage();
  const { profile } = useProfile();
  const t = messages.graduationPage;
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
              {t.eyebrow}
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#1d1d1f] sm:text-6xl">
              {t.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg">
              {t.intro}
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <p className="text-sm font-medium text-[#6e6e73]">{t.overallProgress}</p>
            <p className="mt-2 text-5xl font-semibold tracking-normal text-[#1d1d1f]">
              {graduationResult.overallProgress}%
            </p>
            <div className="mt-5">
              <ProgressBar value={graduationResult.overallProgress} />
            </div>
            <p className="mt-4 text-sm leading-6 text-[#6e6e73]">
              {t.totalUnitsCompleted({
                completed: graduationResult.totalCompletedUnits,
                required: graduationResult.totalRequiredUnits
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6e6e73]">{t.program}</p>
            <GraduationCap className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-xl font-semibold text-[#1d1d1f]">{profile.program}</p>
          <p className="mt-1 text-sm text-[#6e6e73]">{profile.university}</p>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6e6e73]">{messages.common.currentGpa}</p>
            <Target className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-4xl font-semibold text-[#1d1d1f]">
            {profile.currentGpa || "-"}
          </p>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6e6e73]">
              {messages.common.completedCourses}
            </p>
            <BookOpen className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-4xl font-semibold text-[#1d1d1f]">
            {profile.completedCourses.length}
          </p>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#6e6e73]">{t.missingUnits}</p>
            <Layers3 className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          </div>
          <p className="mt-3 text-4xl font-semibold text-[#1d1d1f]">
            {graduationResult.missingUnits}
          </p>
        </div>
      </section>

      {profile.completedCourses.length === 0 ? (
        <section className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-5 text-sm leading-6 text-[#9a3412]">
          {t.noCompletedCourses}{" "}
          <Link href="/profile" className="font-semibold underline underline-offset-4">
            {messages.common.academicProfile}
          </Link>{" "}
          {t.noCompletedCoursesSuffix}
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
                {t.warnings}
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                {t.warningsDescription}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {warnings.map((warning) => (
              <p
                key={warning}
                className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm leading-6 text-[#9a3412]"
              >
                {translateEngineText(warning, t)}
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
              {t.requirementStatus}
            </h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              {t.requirementDescription}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {graduationResult.requirementStatuses.map((requirement) => (
            <RequirementStatusCard
              key={requirement.key}
              requirement={requirement}
              labels={{
                ...t.requirementLabels,
                requirementTranslations: t.requirementTranslations
              }}
            />
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
                {t.completedRequirements}
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                {t.completedRequirementsDescription}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <RequirementPillList
              requirements={graduationResult.completedRequirements}
              emptyText={t.noCompletedRequirements}
              requirementTranslations={t.requirementTranslations}
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
                {t.remainingRequirements}
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                {t.remainingRequirementsDescription}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <RequirementPillList
              requirements={graduationResult.remainingRequirements}
              emptyText={t.noRemainingRequirements}
              requirementTranslations={t.requirementTranslations}
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
                {t.missingCourses}
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                {t.missingCoursesDescription}
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
                        {messages.common.level} {course.level} · {course.units}{" "}
                        {messages.common.units} · {course.category}
                      </p>
                    </div>
                    <span className="w-fit rounded-full border border-[#e5e5ea] bg-white px-3 py-1 text-xs font-semibold text-[#6e6e73]">
                      {messages.common.semester} {course.semester}
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <div className={`${softPanelClass} p-5 text-sm leading-6 text-[#6e6e73]`}>
                {t.noMissingCourses}
              </div>
            )}
          </div>
        </div>

        <aside className={`${panelClass} p-5`}>
          <p className="text-sm font-medium text-[#6e6e73]">{t.missingUnits}</p>
          <p className="mt-2 text-5xl font-semibold tracking-normal text-[#1d1d1f]">
            {graduationResult.missingUnits}
          </p>
          <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
            {t.missingUnitsDescription}
          </p>
          <Link
            href="/course-planner"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            {t.fixMyDegree}
          </Link>
          <Link
            href="/profile"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
            {t.updateProfile}
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
              {t.recommendedNextCourses}
            </h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              {t.recommendedDescription}
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
                      {translateEngineText(
                        recommendation.reasons[0] || recommendation.course.description,
                        t
                      )}
                    </p>
                  </div>
                  <div className="grid min-w-40 grid-cols-2 gap-2 sm:text-right">
                    <div>
                      <p className="text-xs font-medium text-[#86868b]">
                        {messages.common.difficulty}
                      </p>
                      <p className="text-xl font-semibold text-[#1d1d1f]">
                        {recommendation.course.difficulty}/5
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#86868b]">{messages.common.math}</p>
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
              {t.noRecommendations}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
