"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Target,
  TrendingUp
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useProfile } from "@/components/ProfileProvider";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";

function clampNumber(value, min, max) {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return min;
  }

  return Math.min(Math.max(numericValue, min), max);
}

function formatGpa(value) {
  if (!Number.isFinite(value)) {
    return "0.00";
  }

  return Math.max(value, 0).toFixed(2);
}

function getDifficulty(requiredGpa, t) {
  if (requiredGpa <= 5.5) {
    return {
      label: t.difficultyLevels.easy.label,
      detail: t.difficultyLevels.easy.detail,
      badge: "bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]",
      fill: "bg-[#34c759]"
    };
  }

  if (requiredGpa <= 6.2) {
    return {
      label: t.difficultyLevels.moderate.label,
      detail: t.difficultyLevels.moderate.detail,
      badge: "bg-[#fbfbfd] text-[#51247a] border-[#e5e5ea]",
      fill: "bg-[#51247a]"
    };
  }

  if (requiredGpa <= 6.7) {
    return {
      label: t.difficultyLevels.hard.label,
      detail: t.difficultyLevels.hard.detail,
      badge: "bg-[#fff7ed] text-[#9a3412] border-[#fed7aa]",
      fill: "bg-[#ff9f0a]"
    };
  }

  return {
    label: t.difficultyLevels.veryHard.label,
    detail: t.difficultyLevels.veryHard.detail,
    badge: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]",
    fill: "bg-[#ff3b30]"
  };
}

function getAdvice(requiredGpa, targetGpa, currentGpa, t) {
  if (requiredGpa > 7) {
    return t.advice.impossible;
  }

  if (requiredGpa > 6.7) {
    return t.advice.veryHard;
  }

  if (requiredGpa > 6.2) {
    return t.advice.hard;
  }

  if (requiredGpa > 5.5) {
    return t.advice.moderate;
  }

  if (targetGpa <= currentGpa) {
    return t.advice.alreadyOnTrack;
  }

  return t.advice.steady;
}

function ProfileField({ label, value, helper }) {
  return (
    <div className="block">
      <p className="text-sm font-medium text-[#6e6e73]">{label}</p>
      <div className="mt-2 min-h-14 rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] px-4 py-3">
        <p className="text-lg font-semibold text-[#1d1d1f]">{value}</p>
        {helper ? <p className="mt-1 text-xs font-medium text-[#86868b]">{helper}</p> : null}
      </div>
    </div>
  );
}

export function GpaGoalPlanner() {
  const { messages } = useLanguage();
  const { profile, academicProgress } = useProfile();
  const t = messages.gpaPage;
  const currentGpa = profile.currentGpa;
  const targetGpa = profile.targetGpa;
  const completedCount = String(academicProgress.completedCourseCount);
  const remainingCount = String(academicProgress.remainingCourseCount);

  const result = useMemo(() => {
    const current = clampNumber(currentGpa, 0, 7);
    const completed = Math.max(Number(completedCount) || 0, 0);
    const remaining = Math.max(Number(remainingCount) || 0, 0);
    const target = clampNumber(targetGpa, 0, 7);
    const totalCourses = completed + remaining;
    const required =
      remaining > 0 ? (target * totalCourses - current * completed) / remaining : 0;
    const difficulty = getDifficulty(required, t);
    const advice = getAdvice(required, target, current, t);
    const gap = target - current;
    const progress = target > 0 ? Math.min(Math.max((current / target) * 100, 0), 100) : 0;

    return {
      current,
      completed,
      remaining,
      target,
      totalCourses,
      required,
      difficulty,
      advice,
      gap,
      progress
    };
  }, [currentGpa, completedCount, remainingCount, targetGpa, t]);

  const isImpossible = result.required > 7;
  const isAlreadySafe = result.required <= 0 && result.remaining > 0;
  const hasProfileGpa = currentGpa.trim() !== "" && targetGpa.trim() !== "";
  const requiredDisplay =
    !hasProfileGpa || result.remaining === 0 ? t.notFilled : formatGpa(result.required);
  const statusText = !hasProfileGpa
    ? t.missingProfile
    : isImpossible
      ? t.impossible
      : isAlreadySafe
        ? t.alreadySafe
        : t.requiredStatus({ remaining: result.remaining, required: requiredDisplay });

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
              <GraduationCap className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
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
            <p className="text-sm font-medium text-[#6e6e73]">{t.requiredAverage}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-5xl font-semibold tracking-normal text-[#1d1d1f]">
                {requiredDisplay}
              </p>
              <span className={`mb-1 rounded-full border px-3 py-1 text-sm font-semibold ${result.difficulty.badge}`}>
                {result.difficulty.label}
              </span>
            </div>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              {statusText}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <section className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
              <ClipboardList className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                {t.profileData}
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                {t.profileDataDescription}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ProfileField
              label={messages.common.currentGpa}
              value={currentGpa || "-"}
              helper={messages.common.fromAcademicProfile}
            />
            <ProfileField
              label={t.targetGraduationGpa}
              value={targetGpa || "-"}
              helper={messages.common.fromAcademicProfile}
            />
            <ProfileField
              label={t.completedCourseCount}
              value={completedCount}
              helper={t.fromCompletedCourses}
            />
            <ProfileField
              label={t.remainingCourseCount}
              value={remainingCount}
              helper={t.fromMockRules}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/course-planner"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
            >
              {t.generateSemesterPlan}
            </Link>
            <Link
              href="/profile"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
            >
              {t.editProfile}
            </Link>
          </div>
        </section>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <div className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">{t.gapToTarget}</p>
                <p className="mt-1 text-3xl font-semibold tracking-normal text-[#1d1d1f]">
                  {result.gap <= 0 ? t.achieved : t.gap(formatGpa(result.gap))}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <Target className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#f5f5f7]">
              <div
                className={`h-full rounded-full ${result.difficulty.fill}`}
                style={{ width: `${result.progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-[#6e6e73]">
              {t.currentVsTarget({
                current: formatGpa(result.current),
                target: formatGpa(result.target)
              })}
            </p>
          </div>

          <div className={`rounded-lg border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${result.difficulty.badge}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white">
                {isImpossible ? (
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <TrendingUp className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium opacity-70">{t.difficulty}</p>
                <p className="mt-1 text-3xl font-semibold tracking-normal">
                  {result.difficulty.label}
                </p>
                <p className="mt-2 text-sm leading-6 opacity-75">{result.difficulty.detail}</p>
              </div>
            </div>
          </div>

          <div className={`${panelClass} p-5`}>
            <div className="grid grid-cols-2 gap-3">
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium text-[#86868b]">{t.completed}</p>
                <p className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{result.completed}</p>
              </div>
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium text-[#86868b]">{t.remaining}</p>
                <p className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{result.remaining}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className={`${panelClass} p-5 sm:p-6`}>
        <div className="flex items-center gap-3">
          <span
            className={`grid h-10 w-10 place-items-center rounded-lg ${
              isImpossible ? "bg-[#fef2f2] text-[#b91c1c]" : "bg-[#f5f5f7] text-[#51247a]"
            }`}
          >
            {isImpossible ? (
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
              {t.smartAdvice(result.advice.title)}
            </h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              {t.adviceDescription}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {result.advice.items.map((item, index) => (
            <div key={item} className={`${softPanelClass} p-4`}>
              <div className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-white text-sm font-semibold text-[#51247a]">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-[#6e6e73]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className={`${panelClass} p-4`}>
          <BookOpenCheck className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">{t.formulaTitle}</p>
          <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
            {t.formulaText}
          </p>
        </div>
        <div className={`${panelClass} p-4`}>
          <Target className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">{t.rangesTitle}</p>
          <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
            {t.rangesText}
          </p>
        </div>
        <div className={`${panelClass} p-4`}>
          <GraduationCap className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">{t.reminderTitle}</p>
          <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
            {t.reminderText}
          </p>
        </div>
      </section>
    </div>
  );
}
