"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Plus,
  Sparkles,
  Target,
  Trash2,
  UserRound
} from "lucide-react";
import {
  getBachelorOfEconomicsCourse,
  uqBachelorOfEconomicsCourses
} from "@/data/courses";
import { getProgramRuleForProfile } from "@/data/programRules";
import { checkGraduation } from "@/lib/graduationChecker";
import {
  analyzeSemester,
  recommendCourses,
  uqBachelorOfEconomicsProgram
} from "@/lib/recommendationEngine";
import { useLanguage } from "@/components/LanguageProvider";
import { useProfile } from "@/components/ProfileProvider";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";
const controlClass =
  "min-h-11 rounded-lg border border-[#e5e5ea] bg-white px-3 text-sm font-semibold text-[#1d1d1f] outline-none transition focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10";

function uniqueCourseCodes(courseCodes) {
  return [...new Set(courseCodes.map((courseCode) => courseCode.trim().toUpperCase()).filter(Boolean))];
}

function uniqueStrings(values) {
  return [...new Set(values.filter(Boolean))];
}

function formatCourseMeta(course, messages) {
  return `${messages.common.level} ${course.level} · ${course.units} ${messages.common.units} · ${course.category}`;
}

function plannedCourseCodes(semesterPlan) {
  return semesterPlan.flatMap((semester) => semester.courses);
}

function getSemesterUnits(semester) {
  return semester.courses.reduce((total, courseCode) => {
    const course = getBachelorOfEconomicsCourse(courseCode);
    return total + (course?.units ?? 0);
  }, 0);
}

function getFirstAvailableSemesterId(semesterPlan) {
  return semesterPlan.find((semester) => semester.courses.length < 4)?.id ?? semesterPlan[0]?.id;
}

function translateRiskLabel(label, t) {
  return t.riskLabels[label] ?? label;
}

function translateEngineText(text, t) {
  return t.engineText[text] ?? text;
}

function ProfileIssue({ profile, t }) {
  if (profile.currentGpa && profile.targetGpa) {
    return null;
  }

  return (
    <div className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm leading-6 text-[#9a3412]">
      {t.profileIssuePrefix}{" "}
      <Link href="/profile" className="font-semibold underline underline-offset-4">
        {t.profileIssueLink}
      </Link>{" "}
      {t.profileIssueSuffix}
    </div>
  );
}

export default function CoursePlannerPage() {
  const { messages } = useLanguage();
  const { profile, updateProfile } = useProfile();
  const t = messages.plannerPage;
  const [selectedCourseBySemester, setSelectedCourseBySemester] = useState({});
  const [activeSemesterId, setActiveSemesterId] = useState("semester-1");
  const semesterPlan = profile.semesterPlan;
  const completedCourseSet = useMemo(
    () => new Set(profile.completedCourses),
    [profile.completedCourses]
  );
  const plannedCodes = useMemo(() => plannedCourseCodes(semesterPlan), [semesterPlan]);
  const plannedCourseSet = useMemo(() => new Set(plannedCodes), [plannedCodes]);
  const completedAndPlannedCourses = useMemo(
    () => uniqueCourseCodes([...profile.completedCourses, ...plannedCodes]),
    [plannedCodes, profile.completedCourses]
  );
  const programRule = useMemo(() => getProgramRuleForProfile(profile), [profile]);
  const planningProfile = useMemo(
    () => ({
      ...profile,
      completedCourses: completedAndPlannedCourses
    }),
    [completedAndPlannedCourses, profile]
  );
  const graduationResult = useMemo(
    () => checkGraduation(planningProfile, uqBachelorOfEconomicsCourses, programRule),
    [planningProfile, programRule]
  );
  const recommendationResult = useMemo(
    () =>
      recommendCourses({
        program: uqBachelorOfEconomicsProgram,
        currentGpa: Number(profile.currentGpa) || 0,
        completedCourses: completedAndPlannedCourses,
        targetGpa: Number(profile.targetGpa) || Number(profile.currentGpa) || 0,
        preferredWorkload: profile.preferredWorkload
      }),
    [completedAndPlannedCourses, profile]
  );
  const availableCourses = useMemo(
    () =>
      uqBachelorOfEconomicsCourses.filter(
        (course) => !completedCourseSet.has(course.code) && !plannedCourseSet.has(course.code)
      ),
    [completedCourseSet, plannedCourseSet]
  );
  const activeSemester =
    semesterPlan.find((semester) => semester.id === activeSemesterId) ?? semesterPlan[0];
  const activeSemesterCourses = useMemo(
    () =>
      (activeSemester?.courses ?? [])
        .map((courseCode) => getBachelorOfEconomicsCourse(courseCode))
        .filter(Boolean),
    [activeSemester]
  );
  const semesterAnalysis = useMemo(
    () => analyzeSemester(activeSemesterCourses),
    [activeSemesterCourses]
  );
  const simulatorWarnings = useMemo(
    () =>
      uniqueStrings([
        ...semesterAnalysis.warnings,
        ...graduationResult.prerequisiteWarnings,
        ...recommendationResult.warnings
      ]),
    [graduationResult.prerequisiteWarnings, recommendationResult.warnings, semesterAnalysis.warnings]
  );

  function saveSemesterPlan(nextSemesterPlan) {
    updateProfile({
      semesterPlan: nextSemesterPlan.map((semester) => ({
        ...semester,
        courses: uniqueCourseCodes(semester.courses)
      }))
    });
  }

  function addCourse(semesterId, courseCode) {
    if (!courseCode || completedCourseSet.has(courseCode) || plannedCourseSet.has(courseCode)) {
      return;
    }

    saveSemesterPlan(
      semesterPlan.map((semester) =>
        semester.id === semesterId
          ? { ...semester, courses: [...semester.courses, courseCode] }
          : semester
      )
    );
    setActiveSemesterId(semesterId);
    setSelectedCourseBySemester((current) => ({ ...current, [semesterId]: "" }));
  }

  function removeCourse(semesterId, courseCode) {
    saveSemesterPlan(
      semesterPlan.map((semester) =>
        semester.id === semesterId
          ? { ...semester, courses: semester.courses.filter((code) => code !== courseCode) }
          : semester
      )
    );
    setActiveSemesterId(semesterId);
  }

  function moveCourse(semesterId, courseCode, direction) {
    const currentIndex = semesterPlan.findIndex((semester) => semester.id === semesterId);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= semesterPlan.length) {
      return;
    }

    const nextPlan = semesterPlan.map((semester) => ({ ...semester, courses: [...semester.courses] }));
    nextPlan[currentIndex].courses = nextPlan[currentIndex].courses.filter(
      (code) => code !== courseCode
    );
    nextPlan[nextIndex].courses = uniqueCourseCodes([...nextPlan[nextIndex].courses, courseCode]);
    saveSemesterPlan(nextPlan);
    setActiveSemesterId(nextPlan[nextIndex].id);
  }

  function addRecommendedCourse(courseCode) {
    const targetSemesterId = getFirstAvailableSemesterId(semesterPlan);

    if (targetSemesterId) {
      addCourse(targetSemesterId, courseCode);
    }
  }

  function generateSemesterPlan() {
    const targetSemesterId = getFirstAvailableSemesterId(semesterPlan);

    if (!targetSemesterId) {
      return;
    }

    const targetSemester = semesterPlan.find((semester) => semester.id === targetSemesterId);
    const capacity = Math.max(4 - (targetSemester?.courses.length ?? 0), 0);
    const recommendedCodes = recommendationResult.recommendedCourses
      .map((recommendation) => recommendation.course.code)
      .filter((courseCode) => !completedCourseSet.has(courseCode) && !plannedCourseSet.has(courseCode))
      .slice(0, capacity);

    if (recommendedCodes.length === 0) {
      return;
    }

    saveSemesterPlan(
      semesterPlan.map((semester) =>
        semester.id === targetSemesterId
          ? { ...semester, courses: [...semester.courses, ...recommendedCodes] }
          : semester
      )
    );
    setActiveSemesterId(targetSemesterId);
  }

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
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
            <p className="text-sm font-medium text-[#6e6e73]">{t.plannedProgress}</p>
            <p className="mt-2 text-5xl font-semibold tracking-normal text-[#1d1d1f]">
              {graduationResult.overallProgress}%
            </p>
            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#f5f5f7]">
              <div
                className="h-full rounded-full bg-[#51247a]"
                style={{ width: `${graduationResult.overallProgress}%` }}
              />
            </div>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              {t.progressSummary({
                count: completedAndPlannedCourses.length,
                missingUnits: graduationResult.missingUnits
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${panelClass} p-5`}>
          <BookOpen className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#6e6e73]">
            {messages.common.completedCourses}
          </p>
          <p className="mt-1 text-4xl font-semibold text-[#1d1d1f]">{profile.completedCourses.length}</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <ClipboardList className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#6e6e73]">{t.plannedCourses}</p>
          <p className="mt-1 text-4xl font-semibold text-[#1d1d1f]">{plannedCodes.length}</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <Target className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#6e6e73]">{messages.common.targetGpa}</p>
          <p className="mt-1 text-4xl font-semibold text-[#1d1d1f]">{profile.targetGpa || "-"}</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <Sparkles className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#6e6e73]">{t.nextRecommendations}</p>
          <p className="mt-1 text-4xl font-semibold text-[#1d1d1f]">
            {recommendationResult.recommendedCourses.length}
          </p>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <section className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                {t.sixSemesterPlan}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
                {t.sixSemesterDescription}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
              onClick={generateSemesterPlan}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t.generateSemesterPlan}
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {semesterPlan.map((semester, semesterIndex) => {
              const selectedCourseCode = selectedCourseBySemester[semester.id] ?? "";
              const courses = semester.courses
                .map((courseCode) => getBachelorOfEconomicsCourse(courseCode))
                .filter(Boolean);

              return (
                <article
                  key={semester.id}
                  className={`rounded-lg border p-4 ${
                    activeSemesterId === semester.id
                      ? "border-[#51247a] bg-[#fbf8ff]"
                      : "border-[#e5e5ea] bg-[#fbfbfd]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1d1d1f]">
                        {messages.common.semester} {semesterIndex + 1}
                      </h3>
                      <p className="mt-1 text-sm text-[#6e6e73]">
                        {semester.courses.length} {messages.common.courses} ·{" "}
                        {getSemesterUnits(semester)} {messages.common.units}
                      </p>
                    </div>
                    <span className="rounded-full border border-[#e5e5ea] bg-white px-3 py-1 text-xs font-semibold text-[#6e6e73]">
                      S{semesterIndex + 1}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex min-h-9 items-center justify-center rounded-lg border border-[#e5e5ea] bg-white px-3 text-xs font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                    onClick={() => setActiveSemesterId(semester.id)}
                  >
                    {t.analyzeSemester}
                  </button>

                  <div className="mt-4 grid gap-3">
                    {courses.length ? (
                      courses.map((course) => (
                        <div key={course.code} className="rounded-lg border border-[#e5e5ea] bg-white p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-[#1d1d1f]">
                                {course.code} · {course.name}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-[#6e6e73]">
                                {formatCourseMeta(course, messages)}
                              </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5ea] bg-white text-[#6e6e73] transition hover:bg-[#f5f5f7] disabled:opacity-40"
                                disabled={semesterIndex === 0}
                                onClick={() => moveCourse(semester.id, course.code, -1)}
                                title={t.moveUp}
                              >
                                <ArrowUp className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5ea] bg-white text-[#6e6e73] transition hover:bg-[#f5f5f7] disabled:opacity-40"
                                disabled={semesterIndex === semesterPlan.length - 1}
                                onClick={() => moveCourse(semester.id, course.code, 1)}
                                title={t.moveDown}
                              >
                                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5ea] bg-white text-[#b91c1c] transition hover:bg-[#fef2f2]"
                                onClick={() => removeCourse(semester.id, course.code)}
                                title={t.removeCourse}
                              >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-[#d2d2d7] bg-white p-4 text-sm leading-6 text-[#86868b]">
                        {t.emptySemester}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <select
                      className={controlClass}
                      value={selectedCourseCode}
                      onChange={(event) =>
                        setSelectedCourseBySemester((current) => ({
                          ...current,
                          [semester.id]: event.target.value
                        }))
                      }
                    >
                      <option value="">{t.chooseCourse}</option>
                      {availableCourses.map((course) => (
                        <option key={course.code} value={course.code}>
                          {course.code} · {course.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7] disabled:opacity-40"
                      disabled={!selectedCourseCode}
                      onClick={() => addCourse(semester.id, selectedCourseCode)}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      {t.addCourse}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="grid gap-4 xl:sticky xl:top-24">
          <section className={`${panelClass} p-5`}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <UserRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">
                  {messages.common.academicProfile}
                </p>
                <p className="text-xl font-semibold text-[#1d1d1f]">{profile.program}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium uppercase text-[#86868b]">
                  {t.currentTargetGpa}
                </p>
                <p className="mt-2 text-lg font-semibold text-[#1d1d1f]">
                  {profile.currentGpa || "-"} / {profile.targetGpa || "-"}
                </p>
              </div>
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium uppercase text-[#86868b]">
                  {messages.common.preferredWorkload}
                </p>
                <p className="mt-2 text-lg font-semibold text-[#1d1d1f]">
                  {t.workloadLabels[profile.preferredWorkload]}
                </p>
              </div>
            </div>
          </section>

          <ProfileIssue profile={profile} t={t} />

          <section className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">{t.graduationCheck}</p>
                <p className="mt-1 text-3xl font-semibold text-[#1d1d1f]">
                  {graduationResult.overallProgress}%
                </p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-[#51247a]" aria-hidden="true" />
            </div>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              {t.graduationCheckDescription}
            </p>
          </section>

          <section className={`${panelClass} p-5`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#6e6e73]">{t.semesterAnalysis}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                  {activeSemester
                    ? `${messages.common.semester} ${semesterPlan.findIndex((semester) => semester.id === activeSemester.id) + 1}`
                    : messages.common.semester}
                </h2>
              </div>
              <Target className="h-6 w-6 shrink-0 text-[#51247a]" aria-hidden="true" />
            </div>

            <select
              className={`${controlClass} mt-4 w-full`}
              value={activeSemester?.id ?? ""}
              onChange={(event) => setActiveSemesterId(event.target.value)}
            >
              {semesterPlan.map((semester, index) => (
                <option key={semester.id} value={semester.id}>
                  {messages.common.semester} {index + 1}
                </option>
              ))}
            </select>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium uppercase text-[#86868b]">
                  {messages.common.difficulty}
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#1d1d1f]">
                  {semesterAnalysis.difficultyScore || "-"}
                </p>
              </div>
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium uppercase text-[#86868b]">{t.mathIntensity}</p>
                <p className="mt-2 text-2xl font-semibold text-[#1d1d1f]">
                  {semesterAnalysis.mathIntensity}
                </p>
              </div>
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium uppercase text-[#86868b]">{t.examLoad}</p>
                <p className="mt-2 text-2xl font-semibold text-[#1d1d1f]">
                  {semesterAnalysis.examLoad}%
                </p>
              </div>
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium uppercase text-[#86868b]">{t.assignmentLoad}</p>
                <p className="mt-2 text-2xl font-semibold text-[#1d1d1f]">
                  {semesterAnalysis.assignmentLoad}%
                </p>
              </div>
            </div>

            <div className={`${softPanelClass} mt-3 p-4`}>
              <p className="text-xs font-medium uppercase text-[#86868b]">
                {t.estimatedStudyHours}
              </p>
              <p className="mt-2 text-2xl font-semibold text-[#1d1d1f]">
                {semesterAnalysis.estimatedStudyHours} {t.hoursPerWeek}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
                {t.courseUnitsSummary({
                  courseCount: semesterAnalysis.courseCount,
                  units: semesterAnalysis.totalUnits
                })}
              </p>
            </div>

            {semesterAnalysis.riskLabels.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {semesterAnalysis.riskLabels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[#fed7aa] bg-[#fff7ed] px-3 py-1 text-xs font-semibold text-[#9a3412]"
                  >
                    {translateRiskLabel(label, t)}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-3 text-sm font-medium leading-6 text-[#166534]">
                {t.noSemesterRisk}
              </p>
            )}
          </section>

          <section className={`${panelClass} p-5`}>
            <div className="flex items-center gap-2 text-[#1d1d1f]">
              <AlertTriangle className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
              <p className="text-sm font-semibold">{t.warnings}</p>
            </div>
            <div className="mt-4 grid gap-2">
              {simulatorWarnings.length ? (
                simulatorWarnings
                  .slice(0, 5)
                  .map((warning) => (
                    <p
                      key={warning}
                      className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-3 text-sm leading-6 text-[#9a3412]"
                    >
                      {translateEngineText(warning, t)}
                    </p>
                  ))
              ) : (
                <p className="text-sm leading-6 text-[#86868b]">
                  {t.warningHint}
                </p>
              )}
            </div>
          </section>

          <section className={`${panelClass} p-5`}>
            <p className="text-sm font-medium text-[#6e6e73]">{t.recommendationEngine}</p>
            <p className="mt-3 text-sm leading-6 text-[#6e6e73]">
              {translateEngineText(recommendationResult.reason, t)}
            </p>
          </section>
        </aside>
      </div>

      <section className={`${panelClass} p-5 sm:p-6`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
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

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {recommendationResult.recommendedCourses.length ? (
            recommendationResult.recommendedCourses.map((recommendation) => (
              <article key={recommendation.course.code} className={`${softPanelClass} p-4`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-lg font-semibold text-[#1d1d1f]">
                      {recommendation.course.code} · {recommendation.course.name}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
                      {formatCourseMeta(recommendation.course, messages)}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#6e6e73]">
                      {translateEngineText(
                        recommendation.reasons[0] || recommendation.course.description,
                        t
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-3 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
                    onClick={() => addRecommendedCourse(recommendation.course.code)}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    {t.addToPlan}
                  </button>
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
