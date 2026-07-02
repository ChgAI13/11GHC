"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  CheckCircle2,
  Database,
  Filter,
  Gauge,
  GraduationCap,
  LinkIcon,
  Search,
  Sigma
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useProfile } from "@/components/ProfileProvider";
import { uqEconomicsCourses } from "@/data/economicsCourses";
import { getProgramRule } from "@/data/programRules";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";
const inputClass =
  "h-12 w-full rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] outline-none transition placeholder:text-[#a1a1a6] focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10";

const programRule = getProgramRule("2467", 2026);
const coreCourseCodes = new Set(
  programRule.coreRequirements.flatMap((requirement) => requirement.requiredCourseCodes ?? [])
);
const flexibleCoreCourseCodes = new Set(
  programRule.flexibleCoreRequirements.flatMap(
    (requirement) => requirement.requiredCourseCodes ?? []
  )
);

function getProgramCategory(courseCode) {
  if (coreCourseCodes.has(courseCode)) {
    return "Core";
  }

  if (flexibleCoreCourseCodes.has(courseCode)) {
    return "Flexible Core";
  }

  return "Elective";
}

function formatList(value, unknownLabel) {
  if (Array.isArray(value) && value.length > 0) {
    return value.join(", ");
  }

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return unknownLabel;
}

function hasSemester(course, semesterFilter) {
  if (semesterFilter === "All") {
    return true;
  }

  if (!Array.isArray(course.semester)) {
    return false;
  }

  const hasSemester1 = course.semester.some((semester) => semester.includes("Semester 1"));
  const hasSemester2 = course.semester.some((semester) => semester.includes("Semester 2"));

  if (semesterFilter === "Both") {
    return hasSemester1 && hasSemester2;
  }

  return course.semester.some((semester) => semester.includes(semesterFilter));
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-normal text-[#86868b]">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${
              value === option.value
                ? "border-[#51247a] bg-[#51247a] text-white"
                : "border-[#e5e5ea] bg-white text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className={`${softPanelClass} min-h-20 p-4`}>
      <div className="flex items-center gap-2 text-[#86868b]">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-normal">{label}</p>
      </div>
      <p className="mt-2 text-lg font-semibold text-[#1d1d1f]">{value}</p>
    </div>
  );
}

function CourseCard({ course, expanded, isCompleted, onToggle, t }) {
  const programCategory = getProgramCategory(course.courseCode);
  const semesterText = formatList(course.semester, t.common.unknown);
  const prerequisitesText = formatList(course.prerequisites, t.common.unknown);
  const difficulty = course.difficultyScore ?? t.common.unknown;
  const mathIntensity = course.mathIntensity ?? t.common.unknown;
  const page = t.coursesPage;

  return (
    <article className={`${panelClass} overflow-hidden`}>
      <button
        type="button"
        className="block w-full p-5 text-left transition hover:bg-[#fbfbfd] sm:p-6"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#51247a] px-3 py-1 text-xs font-black text-white">
                {course.courseCode}
              </span>
              <span className="rounded-full border border-[#e5e5ea] bg-white px-3 py-1 text-xs font-semibold text-[#6e6e73]">
                {page.categoryLabels[programCategory]}
              </span>
              <span className="rounded-full border border-[#e5e5ea] bg-white px-3 py-1 text-xs font-semibold text-[#6e6e73]">
                {t.common.level} {course.level}
              </span>
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-1 text-xs font-semibold text-[#166534]">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {page.completed}
                </span>
              ) : null}
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-normal text-[#1d1d1f]">
              {course.courseName}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6e6e73]">
              {semesterText} · {course.category}
            </p>
          </div>

          <span className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#6e6e73]">
            {expanded ? page.collapse : page.expand}
            <ChevronDown
              className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={GraduationCap} label={t.common.units} value={course.units ?? t.common.unknown} />
          <Metric icon={Database} label={page.semester} value={semesterText} />
          <Metric icon={Gauge} label={page.difficulty} value={`${difficulty}/5`} />
          <Metric icon={Sigma} label={page.math} value={`${mathIntensity}/5`} />
        </div>

        <div className={`${softPanelClass} mt-3 p-4`}>
          <p className="text-xs font-semibold uppercase tracking-normal text-[#86868b]">
            {page.prerequisites}
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-[#1d1d1f]">
            {prerequisitesText}
          </p>
        </div>
      </button>

      {expanded ? (
        <div className="border-t border-[#e5e5ea] px-5 py-5 sm:px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <p className="text-sm font-semibold text-[#1d1d1f]">{page.description}</p>
              <p className="mt-2 text-sm leading-7 text-[#6e6e73]">
                {course.description || t.common.unknown}
              </p>
            </div>
            <aside className="grid gap-3">
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-semibold uppercase tracking-normal text-[#86868b]">
                  {page.confidence}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#1d1d1f]">
                  {course.dataConfidence}
                </p>
              </div>
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-semibold uppercase tracking-normal text-[#86868b]">
                  {page.source}
                </p>
                <div className="mt-3 grid gap-2">
                  {course.sourceUrl.map((source, index) => (
                    <a
                      key={source}
                      href={source}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-3 text-xs font-semibold text-[#51247a] transition hover:bg-[#f5f5f7]"
                    >
                      <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {page.sourceLink(index + 1)}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export default function CoursesPage() {
  const { messages } = useLanguage();
  const { profile } = useProfile();
  const t = messages.coursesPage;
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [expandedCourseCode, setExpandedCourseCode] = useState("");
  const completedCourseSet = useMemo(
    () => new Set(profile.completedCourses),
    [profile.completedCourses]
  );

  const courses = useMemo(
    () =>
      uqEconomicsCourses.map((course) => ({
        ...course,
        programCategory: getProgramCategory(course.courseCode)
      })),
    []
  );

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesQuery =
        !normalizedQuery ||
        course.courseCode.toLowerCase().includes(normalizedQuery) ||
        course.courseName.toLowerCase().includes(normalizedQuery);
      const matchesLevel =
        levelFilter === "All" || String(course.level) === levelFilter;
      const matchesCategory =
        categoryFilter === "All" || course.programCategory === categoryFilter;
      const matchesSemester = hasSemester(course, semesterFilter);

      return matchesQuery && matchesLevel && matchesCategory && matchesSemester;
    });
  }, [categoryFilter, courses, levelFilter, query, semesterFilter]);

  const levelOptions = [
    { label: messages.common.all, value: "All" },
    { label: `${messages.common.level} 1`, value: "1" },
    { label: `${messages.common.level} 2`, value: "2" },
    { label: `${messages.common.level} 3`, value: "3" }
  ];
  const categoryOptions = [
    { label: messages.common.all, value: "All" },
    { label: t.categoryLabels.Core, value: "Core" },
    { label: t.categoryLabels["Flexible Core"], value: "Flexible Core" },
    { label: t.categoryLabels.Elective, value: "Elective" }
  ];
  const semesterOptions = [
    { label: messages.common.all, value: "All" },
    { label: `${messages.common.semester} 1`, value: "Semester 1" },
    { label: `${messages.common.semester} 2`, value: "Semester 2" },
    { label: t.both, value: "Both" }
  ];

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
              <Database className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
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
            <p className="text-sm font-medium text-[#6e6e73]">{t.results}</p>
            <p className="mt-2 text-5xl font-semibold tracking-normal text-[#1d1d1f]">
              {filteredCourses.length}
            </p>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              {uqEconomicsCourses.length} {messages.common.courses} · {completedCourseSet.size}{" "}
              {t.profileCompleted}
            </p>
          </div>
        </div>
      </section>

      <section className={`${panelClass} p-5 sm:p-6`}>
        <div className="grid gap-5 lg:grid-cols-[minmax(260px,1fr)_2fr] lg:items-start">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-normal text-[#86868b]">
              {t.searchLabel}
            </span>
            <span className="relative mt-2 block">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]"
                aria-hidden="true"
              />
              <input
                className={`${inputClass} pl-11`}
                type="search"
                value={query}
                placeholder={t.search}
                onChange={(event) => setQuery(event.target.value)}
              />
            </span>
          </label>

          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-[#1d1d1f]">
              <Filter className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
              <p className="text-sm font-semibold">{t.filters}</p>
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              <FilterGroup
                label={t.level}
                options={levelOptions}
                value={levelFilter}
                onChange={setLevelFilter}
              />
              <FilterGroup
                label={t.category}
                options={categoryOptions}
                value={categoryFilter}
                onChange={setCategoryFilter}
              />
              <FilterGroup
                label={t.semester}
                options={semesterOptions}
                value={semesterFilter}
                onChange={setSemesterFilter}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {filteredCourses.length ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.courseCode}
              course={course}
              expanded={expandedCourseCode === course.courseCode}
              isCompleted={completedCourseSet.has(course.courseCode)}
              onToggle={() =>
                setExpandedCourseCode((currentCourseCode) =>
                  currentCourseCode === course.courseCode ? "" : course.courseCode
                )
              }
              t={messages}
            />
          ))
        ) : (
          <div className={`${panelClass} p-8 text-center`}>
            <BookOpen className="mx-auto h-8 w-8 text-[#86868b]" aria-hidden="true" />
            <p className="mt-4 text-sm font-semibold text-[#6e6e73]">{t.noResults}</p>
          </div>
        )}
      </section>
    </div>
  );
}
