"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Save,
  Settings2,
  SlidersHorizontal
} from "lucide-react";
import { uqBachelorOfEconomicsCourses } from "@/data/courses";
import { useProfile } from "@/components/ProfileProvider";

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
  const { profile, saveProfile } = useProfile();
  const [draftProfile, setDraftProfile] = useState(profile);
  const [savedMessage, setSavedMessage] = useState("");

  const completedCourseSet = useMemo(
    () => new Set(draftProfile.completedCourses),
    [draftProfile.completedCourses]
  );

  useEffect(() => {
    setDraftProfile(profile);
  }, [profile]);

  function updateField(field, value) {
    setSavedMessage("");
    setDraftProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value
    }));
  }

  function toggleCompletedCourse(courseCode) {
    setSavedMessage("");
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
    setSavedMessage("Academic Profile 已保存，Dashboard、GPA、Course Planner 和 Graduation Checker 已同步更新。");
  }

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
              <Settings2 className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
              Student Data Hub
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#1d1d1f] sm:text-6xl">
              Academic Profile
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg">
              这里是整个产品唯一的数据入口。保存后，GPA Planner、Course Planner 和 Graduation Checker 都可以读取同一份学习资料。
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <p className="text-sm font-medium text-[#6e6e73]">Profile Status</p>
            <p className="mt-2 text-3xl font-semibold tracking-normal text-[#1d1d1f]">
              {profile.completedCourses.length} courses
            </p>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              Current GPA {profile.currentGpa || "-"} · Target GPA {profile.targetGpa || "-"} ·{" "}
              {profile.preferredWorkload} workload
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
                基础信息
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                第一版固定支持 University of Queensland · Bachelor of Economics。
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">University</span>
              <input
                className={`${inputClass} bg-[#fbfbfd]`}
                type="text"
                value={draftProfile.university}
                readOnly
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">Program</span>
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
              <span className="text-sm font-medium text-[#6e6e73]">Current GPA</span>
              <input
                className={inputClass}
                type="number"
                min="0"
                max="7"
                step="0.01"
                inputMode="decimal"
                placeholder="例如 5.60"
                value={draftProfile.currentGpa}
                onChange={(event) => updateField("currentGpa", event.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">Target GPA</span>
              <input
                className={inputClass}
                type="number"
                min="0"
                max="7"
                step="0.01"
                inputMode="decimal"
                placeholder="例如 6.20"
                value={draftProfile.targetGpa}
                onChange={(event) => updateField("targetGpa", event.target.value)}
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-[#6e6e73]">
                Expected Graduation Semester
              </span>
              <select
                className={inputClass}
                value={draftProfile.expectedGraduationSemester}
                onChange={(event) =>
                  updateField("expectedGraduationSemester", event.target.value)
                }
              >
                <option value="">请选择预计毕业学期</option>
                {graduationSemesterOptions.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <p className="text-sm font-medium text-[#6e6e73]">Preferred Workload</p>
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
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Completed Courses</p>
                <p className="mt-1 text-sm text-[#86868b]">
                  已完成 {draftProfile.completedCourses.length} 门课程
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-xs font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7]"
                onClick={() => updateField("completedCourses", [])}
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
        </section>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <div className={`${panelClass} p-5`}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Data Flow</p>
                <p className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                  Single Source
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <div className={`${softPanelClass} p-4 text-sm leading-6 text-[#6e6e73]`}>
                Profile 保存到 Local Storage，页面切换、刷新、关闭浏览器后都会恢复。
              </div>
              <div className={`${softPanelClass} p-4 text-sm leading-6 text-[#6e6e73]`}>
                Course Planner 会读取这里的 GPA、已完成课程和学习强度，再调用规则引擎。
              </div>
            </div>
          </div>

          <div className={`${panelClass} p-5`}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <CalendarDays className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">Next Step</p>
                <p className="text-xl font-semibold tracking-normal text-[#1d1d1f]">
                  Generate Course Plan
                </p>
              </div>
            </div>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              保存后可以直接去 Course Planner，不需要重复输入 GPA 或已完成课程。
            </p>
            <Link
              href="/course-planner"
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Open Course Planner
            </Link>
          </div>

          {savedMessage ? (
            <div className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-4 text-sm font-medium leading-6 text-[#166534]">
              <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
              {savedMessage}
            </div>
          ) : null}

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Save Academic Profile
          </button>
        </aside>
      </form>
    </div>
  );
}
