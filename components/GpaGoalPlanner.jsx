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
import { useProfile } from "@/components/ProfileProvider";
import { uqBachelorOfEconomicsGraduationRules } from "@/data/graduationRules";

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";
const STANDARD_COURSE_UNITS = 2;

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

function getDifficulty(requiredGpa) {
  if (requiredGpa <= 5.5) {
    return {
      label: "轻松",
      detail: "剩余课程保持稳定即可",
      badge: "bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]",
      fill: "bg-[#34c759]"
    };
  }

  if (requiredGpa <= 6.2) {
    return {
      label: "中等",
      detail: "需要多数课程达到 Credit 到 Distinction",
      badge: "bg-[#fbfbfd] text-[#51247a] border-[#e5e5ea]",
      fill: "bg-[#51247a]"
    };
  }

  if (requiredGpa <= 6.7) {
    return {
      label: "困难",
      detail: "需要稳定冲 Distinction 到 HD",
      badge: "bg-[#fff7ed] text-[#9a3412] border-[#fed7aa]",
      fill: "bg-[#ff9f0a]"
    };
  }

  return {
    label: "非常困难",
    detail: "基本需要剩余课程接近满分",
    badge: "bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]",
    fill: "bg-[#ff3b30]"
  };
}

function getAdvice(requiredGpa, targetGpa, currentGpa) {
  if (requiredGpa > 7) {
    return {
      title: "目标过高，建议先调整选课策略",
      items: [
        "这个目标按 7 分制已经超过单科满分，单靠剩余课程很难实现。",
        "优先选择评分透明、作业占比高、你有基础的课程，避免纯期末考试占比过高的课。",
        "如果目标是升学或转专业，建议同时准备替代方案，例如补充实习、作品集或语言成绩。"
      ]
    };
  }

  if (requiredGpa > 6.7) {
    return {
      title: "需要冲刺高分，选课要更保守",
      items: [
        "剩余课程基本需要稳定拿到 HD 水平，容错空间很小。",
        "尽量选择你已经有基础、老师评分标准清楚、历年反馈较稳定的课程。",
        "开学第一周就整理每门课的 rubric、due date 和分数组成，所有大作业至少提前一周完成初稿。"
      ]
    };
  }

  if (requiredGpa > 6.2) {
    return {
      title: "目标偏难，但可以通过节奏管理实现",
      items: [
        "多数课程需要保持 Distinction 附近，不能让任何一门课明显掉队。",
        "把每门课最高权重的 assessment 单独列出来，优先投入时间。",
        "遇到英文要求不确定时，尽早问 tutor 或 student support，不要等到提交前一天。"
      ]
    };
  }

  if (requiredGpa > 5.5) {
    return {
      title: "目标可行，重点是稳定发挥",
      items: [
        "剩余课程只要保持稳定，目标 GPA 有不错机会达成。",
        "建议每周固定复盘 lecture 和 tutorial，避免 due week 集中爆雷。",
        "如果同时打工，把所有 deadline 放进日历，提前处理多个作业撞车的周。"
      ]
    };
  }

  if (targetGpa <= currentGpa) {
    return {
      title: "你已经在目标轨道上",
      items: [
        "当前 GPA 已经接近或高于目标，重点是不要被低分课程拖后腿。",
        "可以优先选择自己擅长或感兴趣的课程，保持出勤和提交节奏。",
        "多余精力可以放在实习、简历、作品集或英文表达能力上。"
      ]
    };
  }

  return {
    title: "目标比较稳，继续保持节奏",
    items: [
      "剩余课程平均要求不高，正常发挥就有机会达成。",
      "建议保持每周学习节奏，提前处理小测、quiz 和 tutorial participation。",
      "如果课程邮件或作业要求看不懂，可以配合邮件解释工具一起使用。"
    ]
  };
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
  const { profile } = useProfile();
  const currentGpa = profile.currentGpa;
  const targetGpa = profile.targetGpa;
  const completedCount = String(profile.completedCourses.length);
  const totalCourseCount = Math.ceil(
    uqBachelorOfEconomicsGraduationRules.totalUnits / STANDARD_COURSE_UNITS
  );
  const remainingCount = String(
    Math.max(totalCourseCount - profile.completedCourses.length, 0)
  );

  const result = useMemo(() => {
    const current = clampNumber(currentGpa, 0, 7);
    const completed = Math.max(Number(completedCount) || 0, 0);
    const remaining = Math.max(Number(remainingCount) || 0, 0);
    const target = clampNumber(targetGpa, 0, 7);
    const totalCourses = completed + remaining;
    const required =
      remaining > 0 ? (target * totalCourses - current * completed) / remaining : 0;
    const difficulty = getDifficulty(required);
    const advice = getAdvice(required, target, current);
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
  }, [currentGpa, completedCount, remainingCount, targetGpa]);

  const isImpossible = result.required > 7;
  const isAlreadySafe = result.required <= 0 && result.remaining > 0;
  const hasProfileGpa = currentGpa.trim() !== "" && targetGpa.trim() !== "";
  const requiredDisplay =
    !hasProfileGpa || result.remaining === 0 ? "未填写" : formatGpa(result.required);
  const statusText = !hasProfileGpa
    ? "请先到 Academic Profile 填写 Current GPA 和 Target GPA。"
    : isImpossible
      ? "按当前课程数量，目标超过 7 分制上限。"
      : isAlreadySafe
        ? "你已经高于目标轨道，后续重点是稳住。"
        : `剩余 ${result.remaining} 门课平均需要达到 ${requiredDisplay}。`;

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
              GPA 目标规划器
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg">
              自动读取 Academic Profile，估算剩余课程平均需要达到多少 GPA。
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <p className="text-sm font-medium text-[#6e6e73]">剩余每门课平均需要</p>
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
                Academic Profile 数据
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                GPA Planner 不再单独保存数据。请在 Academic Profile 修改 GPA 和课程进度。
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ProfileField
              label="当前 GPA"
              value={currentGpa || "-"}
              helper="来自 Academic Profile"
            />
            <ProfileField
              label="目标毕业 GPA"
              value={targetGpa || "-"}
              helper="来自 Academic Profile"
            />
            <ProfileField
              label="已完成课程数"
              value={completedCount}
              helper="来自 Completed Courses"
            />
            <ProfileField
              label="剩余课程数"
              value={remainingCount}
              helper="根据 Mock Degree Rules 计算"
            />
          </div>

          <Link
            href="/profile"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7]"
          >
            去 Academic Profile 修改数据
          </Link>
        </section>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <div className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#6e6e73]">当前距离目标</p>
                <p className="mt-1 text-3xl font-semibold tracking-normal text-[#1d1d1f]">
                  {result.gap <= 0 ? "已达标" : `差 ${formatGpa(result.gap)}`}
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
              当前 {formatGpa(result.current)} / 目标 {formatGpa(result.target)}
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
                <p className="text-sm font-medium opacity-70">达成难度</p>
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
                <p className="text-xs font-medium text-[#86868b]">已完成</p>
                <p className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{result.completed}</p>
              </div>
              <div className={`${softPanelClass} p-4`}>
                <p className="text-xs font-medium text-[#86868b]">剩余</p>
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
              智能建议：{result.advice.title}
            </h2>
            <p className="mt-1 text-sm text-[#6e6e73]">
              根据你的目标和剩余课程数量生成，适合 UQ 经济学学士的 MVP 规划场景。
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
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">公式</p>
          <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
            剩余平均 =（目标 GPA x 总课程数 - 当前 GPA x 已完成课程数）÷ 剩余课程数
          </p>
        </div>
        <div className={`${panelClass} p-4`}>
          <Target className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">难度区间</p>
          <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
            ≤5.5 轻松，5.5-6.2 中等，6.2-6.7 困难，超过 6.7 非常困难。
          </p>
        </div>
        <div className={`${panelClass} p-4`}>
          <GraduationCap className="h-5 w-5 text-[#51247a]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f]">提醒</p>
          <p className="mt-1 text-sm leading-6 text-[#6e6e73]">
            不同学校和学院可能有自己的 GPA 或 WAM 规则，正式用途请以学校说明为准。
          </p>
        </div>
      </section>
    </div>
  );
}
