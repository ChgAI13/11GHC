"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Save,
  Search,
  Settings2,
  SlidersHorizontal
} from "lucide-react";
import { uqBachelorOfEconomicsCourses } from "@/data/courses";
import { useLanguage } from "@/components/LanguageProvider";
import { useProfile } from "@/components/ProfileProvider";
import { calculateAcademicProgress } from "@/lib/academicProgress";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";
const inputClass =
  "mt-2 h-14 w-full rounded-lg border border-[#e5e5ea] bg-white px-4 text-base font-semibold text-[#1d1d1f] outline-none transition placeholder:text-[#c7c7cc] focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10";
const workloadOptions = ["Light", "Medium", "Heavy"];
const graduationSemesterOptions = [
  "Semester 2, 2026",
  "Semester 1, 2027",
  "Semester 2, 2027",
  "Semester 1, 2028",
  "Semester 2, 2028",
  "Semester 1, 2029"
];

export default function AcademicProfilePage() {
  const { messages } = useLanguage();
  const { profile, academicProgress, saveProfile } = useProfile();
  const t = messages.profilePage;
  const [draftProfile, setDraftProfile] = useState(profile);
  const [hasSaved, setHasSaved] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");

  const completedCourseSet = useMemo(
    () => new Set(draftProfile.completedCourses),
    [draftProfile.completedCourses]
  );
  const selectedCourses = useMemo(
    () => uqBachelorOfEconomicsCourses.filter((course) => completedCourseSet.has(course.code)),
    [completedCourseSet]
  );
  const filteredCourses = useMemo(() => {
    const normalizedSearch = courseSearch.trim().toLowerCase();

    if (!normalizedSearch) {
      return uqBachelorOfEconomicsCourses.slice(0, 8);
    }

    return uqBachelorOfEconomicsCourses.filter(
      (course) =>
        course.code.toLowerCase().includes(normalizedSearch) ||
        course.name.toLowerCase().includes(normalizedSearch)
    );
  }, [courseSearch]);
  const draftProgress = useMemo(
    () => calculateAcademicProgress(draftProfile),
    [draftProfile]
  );

  useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  function updateField(field, value) {
    setHasSaved(false);
    setDraftProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value
    }));
  }

  function toggleCompletedCourse(courseCode) {
    setHasSaved(false);
    setDraftProfile((currentProfile) => {
      const isCompleted = currentProfile.completedCourses.includes(courseCode);

      return {
        ...currentProfile,
        completedCourses: isCompleted
          ? currentProfile.completedCourses.filter((code) => code !== courseCode)
          : [...currentProfile.completedCourses, courseCode]
      };
    });
  }

  function handleSave(event) {
    event.preventDefault();
    const savedProfile = saveProfile(draftProfile);
    setDraftProfile(savedProfile);
    setHasSaved(true);
  }

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
              <Settings2 className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
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
            <p className="text-sm font-medium text-[#6e6e73]">{t.status}</p>
            <p className="mt-2 text-3xl font-semibold tracking-normal text-[#1d1d1f]">
              {academicProgress.completedCourseCount} / {academicProgress.totalCourseCount}{" "}
              {messages.common.courses}
            </p>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              {t.statusLine({
                currentGpa: profile.currentGpa,
                targetGpa: profile.targetGpa,
                remainingCourses: academicProgress.remainingCourseCount
              })}
            </p>
          </div>
        </div>
      </section>

      <form className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start" onSubmit={handleSave}>
        <section className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                {t.basicInfo}
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                {t.fixedSupport}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">{t.university}</span>
              <input
                className={`${inputClass} bg-[#fbfbfd]`}
                type="text"
                value={draftProfile.university}
                readOnly
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">{t.program}</span>
              <input
                className={`${inputClass} bg-[#fbfbfd]`}
                type="text"
                value={draftProfile.program}
                readOnly
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">{messages.common.currentGpa}</span>
              <input
                className={inputClass}
                type="number"
                min="0"
                max="7"
                step="0.01"
                inputMode="decimal"
                placeholder={t.currentGpaPlaceholder}
                value={draftProfile.currentGpa}
                onChange={(event) => updateField("currentGpa", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">{messages.common.targetGpa}</span>
              <input
                className={inputClass}
                type="number"
                min="0"
                max="7"
                step="0.01"
                inputMode="decimal"
                placeholder={t.targetGpaPlaceholder}
                value={draftProfile.targetGpa}
                onChange={(event) => updateField("targetGpa", event.target.value)}
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">
                {t.expectedGraduationSemester}
              </span>
              <select
                className={inputClass}
                value={draftProfile.expectedGraduationSemester}
                onChange={(event) =>
                  updateField("expectedGraduationSemester", event.target.value)
                }
              >
                <option value="">{t.graduationPlaceholder}</option>
                {graduationSemesterOptions.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <p className="text-sm font-medium text-[#6e6e73]">
                {messages.common.preferredWorkload}
              </p>
              <div className="mt-2 grid h-14 grid-cols-3 rounded-lg border border-[#e5e5ea] bg-[#f5f5f7] p-1">
                {workloadOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`rounded-md text-sm font-semibold transition ${
                      draftProfile.preferredWorkload === option
                        ? "bg-white text-[#1d1d1f] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                        : "text-[#86868b] hover:text-[#1d1d1f]"
                    }`}
                    onClick={() => updateField("preferredWorkload", option)}
                  >
                    {t.workloadLabels[option]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">
                  {messages.common.completedCourses}
                </p>
                <p className="mt-1 text-sm text-[#86868b]">
                  {t.completedSummary({
                    completed: draftProgress.completedCourseCount,
                    total: draftProgress.totalCourseCount,
                    remaining: draftProgress.remainingCourseCount
                  })}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-xs font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7]"
                onClick={() => updateField("completedCourses", [])}
              >
                {messages.common.clear}
              </button>
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-medium text-[#6e6e73]">{t.searchCourses}</span>
              <span className="relative mt-2 block">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]"
                  aria-hidden="true"
                />
                <input
                  className={`${inputClass} mt-0 pl-11`}
                  type="search"
                  value={courseSearch}
                  placeholder={t.searchPlaceholder}
                  onChange={(event) => setCourseSearch(event.target.value)}
                />
              </span>
            </label>

            {selectedCourses.length ? (
              <div className="mt-4 rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#1d1d1f]">{t.selectedCourses}</p>
                  <p className="text-xs font-semibold text-[#86868b]">
                    {selectedCourses.length} {t.selected}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedCourses.map((course) => (
                    <button
                      key={course.code}
                      type="button"
                      className="rounded-full border border-[#51247a] bg-white px-3 py-1.5 text-xs font-semibold text-[#51247a] transition hover:bg-[#fbf8ff]"
                      onClick={() => toggleCompletedCourse(course.code)}
                      title={t.unselectTitle}
                    >
                      {course.code} ×
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {filteredCourses.map((course) => {
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
            {!filteredCourses.length ? (
              <div className={`${softPanelClass} mt-4 p-5 text-sm leading-6 text-[#86868b]`}>
                {t.noCourseFound}
              </div>
            ) : null}
            {!courseSearch.trim() ? (
              <p className="mt-3 text-sm leading-6 text-[#86868b]">
                {t.defaultCourseHint}
              </p>
            ) : null}
          </div>
        </section>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <div className={`${panelClass} p-5`}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">{t.dataFlow}</p>
                <p className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                  {t.singleSource}
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <div className={`${softPanelClass} p-4 text-sm leading-6 text-[#6e6e73]`}>
                {t.localStorageNote}
              </div>
              <div className={`${softPanelClass} p-4 text-sm leading-6 text-[#6e6e73]`}>
                {t.plannerNote}
              </div>
            </div>
          </div>

          <div className={`${panelClass} p-5`}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">{t.nextStep}</p>
                <p className="text-xl font-semibold tracking-normal text-[#1d1d1f]">
                  {t.generateCoursePlan}
                </p>
              </div>
            </div>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              {t.nextStepDescription}
            </p>
            <Link
              href="/course-planner"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {t.openCoursePlanner}
            </Link>
          </div>

          {hasSaved ? (
            <div className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-4 text-sm font-medium leading-6 text-[#166534]">
              <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
              {t.savedMessage}
            </div>
          ) : null}

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {t.saveButton}
          </button>
        </aside>
      </form>
    </div>
  );
}
