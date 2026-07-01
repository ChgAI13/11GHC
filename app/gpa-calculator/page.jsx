"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  calculateWeightedResult,
  courseToResult,
  formatResult,
  getScale,
  gradeOptions,
  resultTone,
  scaleOptions
} from "@/lib/gpa";

const emptyCourse = {
  name: "",
  credits: 6,
  inputMode: "grade",
  grade: "HD",
  score: 85
};

export default function GpaCalculatorPage() {
  const [scaleKey, setScaleKey] = useState("seven");
  const [courses, setCourses] = useState([
    { ...emptyCourse, name: "Accounting 101", credits: 6, grade: "D" },
    { ...emptyCourse, name: "Business Analytics", credits: 6, grade: "HD" }
  ]);

  const selectedScale = getScale(scaleKey);
  const averageResult = useMemo(
    () => calculateWeightedResult(courses, scaleKey),
    [courses, scaleKey]
  );
  const totalCredits = useMemo(
    () => courses.reduce((sum, course) => sum + (Number(course.credits) || 0), 0),
    [courses]
  );

  function updateCourse(index, field, value) {
    setCourses((current) =>
      current.map((course, courseIndex) =>
        courseIndex === index ? { ...course, [field]: value } : course
      )
    );
  }

  function addCourse() {
    setCourses((current) => [...current, { ...emptyCourse, name: `Course ${current.length + 1}` }]);
  }

  function removeCourse(index) {
    setCourses((current) => current.filter((_, courseIndex) => courseIndex !== index));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      <section className="surface p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-eucalyptus">
              Calculator
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-normal text-ink">
              GPA Calculator
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">
              输入课程名、学分、成绩等级或分数，按不同澳洲大学常见口径计算 GPA 或 WAM。
            </p>
          </div>
          <button type="button" className="primary-button" onClick={addCourse}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            添加课程
          </button>
        </div>

        <div className="mt-6 rounded-lg border border-eucalyptus/15 bg-mint/70 p-4">
          <label>
            <span className="field-label">评分体系</span>
            <select
              className="field-input bg-white"
              value={scaleKey}
              onChange={(event) => setScaleKey(event.target.value)}
            >
              {Object.entries(scaleOptions).map(([key, scale]) => (
                <option key={key} value={key}>
                  {scale.label}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            {selectedScale.helper} 不同学校和学院可能有自己的换算规则，申请或转学时请以学校官方说明为准。
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {courses.map((course, index) => {
            const courseResult = courseToResult(course, scaleKey);

            return (
              <div key={index} className="rounded-lg border border-ink/10 bg-paper p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-ink/70">课程 {index + 1}</p>
                  <button
                    type="button"
                    className="grid h-10 w-10 place-items-center rounded-lg text-ink/45 transition hover:bg-white hover:text-coral disabled:cursor-not-allowed disabled:opacity-30"
                    onClick={() => removeCourse(index)}
                    disabled={courses.length === 1}
                    aria-label="删除课程"
                    title="删除课程"
                  >
                    <Trash2 className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="field-label">课程名</span>
                    <input
                      className="field-input"
                      value={course.name}
                      onChange={(event) => updateCourse(index, "name", event.target.value)}
                      placeholder="例如 Marketing"
                    />
                  </label>

                  <label>
                    <span className="field-label">学分</span>
                    <input
                      className="field-input"
                      type="number"
                      min="0"
                      value={course.credits}
                      onChange={(event) => updateCourse(index, "credits", event.target.value)}
                    />
                  </label>

                  <label>
                    <span className="field-label">输入方式</span>
                    <select
                      className="field-input"
                      value={course.inputMode}
                      onChange={(event) => updateCourse(index, "inputMode", event.target.value)}
                    >
                      <option value="grade">成绩等级</option>
                      <option value="score">分数</option>
                    </select>
                  </label>

                  {course.inputMode === "grade" ? (
                    <label>
                      <span className="field-label">成绩等级</span>
                      <select
                        className="field-input"
                        value={course.grade}
                        onChange={(event) => updateCourse(index, "grade", event.target.value)}
                      >
                        {gradeOptions.map((grade) => (
                          <option key={grade.value} value={grade.value}>
                            {grade.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <label>
                      <span className="field-label">分数</span>
                      <input
                        className="field-input"
                        type="number"
                        min="0"
                        max="100"
                        value={course.score}
                        onChange={(event) => updateCourse(index, "score", event.target.value)}
                      />
                    </label>
                  )}
                </div>

                <div className="mt-4 rounded-lg bg-white px-4 py-3 text-sm font-bold text-ink/70">
                  本课程结果：
                  <span className="text-ink"> {formatResult(courseResult, scaleKey)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <aside className="grid gap-4 lg:sticky lg:top-24">
        <StatCard
          label={selectedScale.resultLabel}
          value={formatResult(averageResult, scaleKey)}
          helper={`按课程学分加权计算，当前口径为 ${selectedScale.label}。`}
          tone={resultTone(averageResult, scaleKey)}
        />
        <StatCard label="总学分" value={String(totalCredits)} helper="只统计大于 0 的学分输入。" />
        <div className="rounded-lg border border-ink/10 bg-white p-4 text-sm leading-6 text-ink/65">
          {scaleKey === "wam"
            ? "WAM 模式下，分数会直接参与加权平均；如果只输入等级，会用 HD=90、D=80、C=70、P=55、F=40 作为估算。"
            : `分数换算规则：${selectedScale.scoreBands.map((band) => band.label).join("，")}。`}
        </div>
      </aside>
    </div>
  );
}
