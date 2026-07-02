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
  recommendCourses,
  uqBachelorOfEconomicsProgram
} from "@/lib/recommendationEngine";
import { useProfile } from "@/components/ProfileProvider";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";
const controlClass =
  "min-h-11 rounded-lg border border-[#e5e5ea] bg-white px-3 text-sm font-semibold text-[#1d1d1f] outline-none transition focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10";

function uniqueCourseCodes(courseCodes) {
  return [...new Set(courseCodes.map((courseCode) => courseCode.trim().toUpperCase()).filter(Boolean))];
}

function formatCourseMeta(course) {
  return `Level ${course.level} · ${course.units} units · ${course.category}`;
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

function ProfileIssue({ profile }) {
  if (profile.currentGpa && profile.targetGpa) {
    return null;
  }

  return (
    <div className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm leading-6 text-[#9a3412]">
      推荐结果会更准确，如果你先到{" "}
      <Link href="/profile" className="font-semibold underline underline-offset-4">
        Academic Profile
      </Link>{" "}
      填写 Current GPA、Target GPA 和已完成课程。
    </div>
  );
}

export default function CoursePlannerPage() {
  const { profile, updateProfile } = useProfile();
  const [selectedCourseBySemester, setSelectedCourseBySemester] = useState({});
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
  }

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
              <GraduationCap className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
              UQ Bachelor of Economics
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#1d1d1f] sm:text-6xl">
              Degree Planner
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg">
              把未来 6 个学期排出来。课程来自最新 Course Database，毕业检查来自 Program Rules，推荐来自 Recommendation Engine。
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <p className="text-sm font-medium text-[#6e6e73]">Planned Degree Progress</p>
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
              {completedAndPlannedCourses.length} courses completed or planned · {graduationResult.missingUnits} units missing
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${panelClass} p-5`}>
          <BookOpen className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#6e6e73]">Completed Courses</p>
          <p className="mt-1 text-4xl font-semibold text-[#1d1d1f]">{profile.completedCourses.length}</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <ClipboardList className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#6e6e73]">Planned Courses</p>
          <p className="mt-1 text-4xl font-semibold text-[#1d1d1f]">{plannedCodes.length}</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <Target className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#6e6e73]">Target GPA</p>
          <p className="mt-1 text-4xl font-semibold text-[#1d1d1f]">{profile.targetGpa || "-"}</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <Sparkles className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium text-[#6e6e73]">Next Recommendations</p>
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
                Six-Semester Plan
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
                Add Course、Move Course、Remove Course 都会保存到 Academic Profile。
              </p>
            </div>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
              onClick={generateSemesterPlan}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Generate Semester Plan
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {semesterPlan.map((semester, semesterIndex) => {
              const selectedCourseCode = selectedCourseBySemester[semester.id] ?? "";
              const courses = semester.courses
                .map((courseCode) => getBachelorOfEconomicsCourse(courseCode))
                .filter(Boolean);

              return (
                <article key={semester.id} className={`${softPanelClass} p-4`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1d1d1f]">{semester.name}</h3>
                      <p className="mt-1 text-sm text-[#6e6e73]">
                        {semester.courses.length} courses · {getSemesterUnits(semester)} units
                      </p>
                    </div>
                    <span className="rounded-full border border-[#e5e5ea] bg-white px-3 py-1 text-xs font-semibold text-[#6e6e73]">
                      S{semesterIndex + 1}
                    </span>
                  </div>

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
                                {formatCourseMeta(course)}
                              </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5ea] bg-white text-[#6e6e73] transition hover:bg-[#f5f5f7] disabled:opacity-40"
                                disabled={semesterIndex === 0}
                                onClick={() => moveCourse(semester.id, course.code, -1)}
                                title="Move Course up"
                              >
                                <ArrowUp className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5ea] bg-white text-[#6e6e73] transition hover:bg-[#f5f5f7] disabled:opacity-40"
                                disabled={semesterIndex === semesterPlan.length - 1}
                                onClick={() => moveCourse(semester.id, course.code, 1)}
                                title="Move Course down"
                              >
                                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="grid h-8 w-8 place-items-center rounded-lg border border-[#e5e5ea] bg-white text-[#b91c1c] transition hover:bg-[#fef2f2]"
                                onClick={() => removeCourse(semester.id, course.code)}
                                title="Remove Course"
                              >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-dashed border-[#d2d2d7] bg-white p-4 text-sm leading-6 text-[#86868b]">
                        这个学期还没有课程。可以手动添加，也可以用推荐引擎生成计划。
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
                      <option value="">Choose course</option>
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
                      Add Course
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
                <p className="text-sm font-medium text-[#6e6e73]">Academic Profile</p>
                <p className="text-xl font-semibold text-[#1d1d1f]">{profile.program}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium uppercase text-[#86868b]">Current / Target GPA</p>
                <p className="mt-2 text-lg font-semibold text-[#1d1d1f]">
                  {profile.currentGpa || "-"} / {profile.targetGpa || "-"}
                </p>
              </div>
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium uppercase text-[#86868b]">Preferred Workload</p>
                <p className="mt-2 text-lg font-semibold text-[#1d1d1f]">
                  {profile.preferredWorkload}
                </p>
              </div>
            </div>
          </section>

          <ProfileIssue profile={profile} />

          <section className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Graduation Check</p>
                <p className="mt-1 text-3xl font-semibold text-[#1d1d1f]">
                  {graduationResult.overallProgress}%
                </p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-[#51247a]" aria-hidden="true" />
            </div>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              使用当前 Profile + 已规划课程调用 Graduation Checker。
            </p>
          </section>

          <section className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Difficulty Score</p>
                <p className="mt-1 text-3xl font-semibold text-[#1d1d1f]">
                  {recommendationResult.difficultyScore || "-"}
                </p>
              </div>
              <Target className="h-6 w-6 text-[#51247a]" aria-hidden="true" />
            </div>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              {recommendationResult.reason}
            </p>
          </section>

          {recommendationResult.warnings.length ? (
            <section className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-5">
              <div className="flex items-center gap-2 text-[#9a3412]">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-semibold">Warnings</p>
              </div>
              <div className="mt-3 grid gap-2">
                {recommendationResult.warnings.slice(0, 3).map((warning) => (
                  <p key={warning} className="text-sm leading-6 text-[#9a3412]">
                    {warning}
                  </p>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </div>

      <section className={`${panelClass} p-5 sm:p-6`}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
              Recommended Next Courses
            </h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              这里只展示 Recommendation Engine 的结果。点击 Add to Plan 会加入第一个有空位的 semester。
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
                      {formatCourseMeta(recommendation.course)}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#6e6e73]">
                      {recommendation.reasons[0] || recommendation.course.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-3 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
                    onClick={() => addRecommendedCourse(recommendation.course.code)}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add to Plan
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className={`${softPanelClass} p-5 text-sm leading-6 text-[#6e6e73]`}>
              当前没有可推荐课程。请检查 Profile 或清理已规划课程。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
