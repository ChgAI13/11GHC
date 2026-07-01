"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Target,
  TrendingUp
} from "lucide-react";

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
      badge: "bg-mint text-eucalyptus border-eucalyptus/20",
      fill: "bg-eucalyptus"
    };
  }

  if (requiredGpa <= 6.2) {
    return {
      label: "中等",
      detail: "需要多数课程达到 Credit 到 Distinction",
      badge: "bg-white text-ocean border-ocean/20",
      fill: "bg-ocean"
    };
  }

  if (requiredGpa <= 6.7) {
    return {
      label: "困难",
      detail: "需要稳定冲 Distinction 到 HD",
      badge: "bg-[#fff6df] text-[#8a5a00] border-gold/25",
      fill: "bg-gold"
    };
  }

  return {
    label: "非常困难",
    detail: "基本需要剩余课程接近满分",
    badge: "bg-[#fff0ec] text-coral border-coral/25",
    fill: "bg-coral"
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

function Field({ label, value, onChange, placeholder, step = "0.01", max = "7" }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-ink/70">{label}</span>
      <input
        className="mt-2 h-14 rounded-lg border border-ink/10 bg-white px-4 text-lg font-black text-ink outline-none transition placeholder:text-ink/25 focus:border-eucalyptus focus:ring-4 focus:ring-eucalyptus/15"
        type="number"
        min="0"
        max={max}
        step={step}
        inputMode={step === "1" ? "numeric" : "decimal"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export function GpaGoalPlanner() {
  const [currentGpa, setCurrentGpa] = useState("5.80");
  const [completedCount, setCompletedCount] = useState("16");
  const [remainingCount, setRemainingCount] = useState("8");
  const [targetGpa, setTargetGpa] = useState("6.20");

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
  const requiredDisplay = result.remaining === 0 ? "未填写" : formatGpa(result.required);
  const statusText = isImpossible
    ? "按当前课程数量，目标超过 7 分制上限。"
    : isAlreadySafe
      ? "你已经高于目标轨道，后续重点是稳住。"
      : `剩余 ${result.remaining} 门课平均需要达到 ${requiredDisplay}。`;

  return (
    <div className="grid gap-5">
      <section className="overflow-hidden rounded-lg bg-ink text-white shadow-soft">
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_340px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-black text-white/85">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              澳洲留学生毕业 GPA 规划
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight tracking-normal sm:text-5xl">
              GPA 目标规划器
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
              输入当前成绩和剩余课程，看看为了达到目标毕业 GPA，接下来每门课平均要拿到多少分。
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {["输入当前成绩", "设定毕业目标", "查看冲刺建议"].map((item, index) => (
                <div key={item} className="rounded-lg bg-white/10 px-3 py-3">
                  <p className="text-xs font-black text-white/45">0{index + 1}</p>
                  <p className="mt-1 text-sm font-black text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/10 p-4">
            <p className="text-sm font-bold text-white/60">剩余每门课平均需要</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-5xl font-black tracking-normal">{requiredDisplay}</p>
              <span className={`mb-1 rounded-lg border px-3 py-1.5 text-sm font-black ${result.difficulty.badge}`}>
                {result.difficulty.label}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/68">{statusText}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_380px] lg:items-start">
        <section className="rounded-lg border border-ink/10 bg-white/90 p-4 shadow-soft backdrop-blur sm:p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-mint text-eucalyptus">
              <ClipboardList className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-black tracking-normal text-ink">填写你的成绩情况</h2>
              <p className="mt-1 text-sm text-ink/55">按澳洲常见 7 分制估算，适合先做毕业成绩规划。</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              label="当前 GPA"
              value={currentGpa}
              onChange={setCurrentGpa}
              placeholder="例如 5.80"
            />
            <Field
              label="目标毕业 GPA"
              value={targetGpa}
              onChange={setTargetGpa}
              placeholder="例如 6.20"
            />
            <Field
              label="已完成课程数"
              value={completedCount}
              onChange={setCompletedCount}
              placeholder="例如 16"
              step="1"
              max="99"
            />
            <Field
              label="剩余课程数"
              value={remainingCount}
              onChange={setRemainingCount}
              placeholder="例如 8"
              step="1"
              max="99"
            />
          </div>
        </section>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-ink/55">当前距离目标</p>
                <p className="mt-1 text-3xl font-black tracking-normal text-ink">
                  {result.gap <= 0 ? "已达标" : `差 ${formatGpa(result.gap)}`}
                </p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-mint text-eucalyptus">
                <Target className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-ink/10">
              <div
                className={`h-full rounded-full ${result.difficulty.fill}`}
                style={{ width: `${result.progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm leading-6 text-ink/60">
              当前 {formatGpa(result.current)} / 目标 {formatGpa(result.target)}
            </p>
          </div>

          <div className={`rounded-lg border p-4 shadow-soft ${result.difficulty.badge}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/80">
                {isImpossible ? (
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <TrendingUp className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-black opacity-70">达成难度</p>
                <p className="mt-1 text-3xl font-black tracking-normal">{result.difficulty.label}</p>
                <p className="mt-2 text-sm leading-6 opacity-75">{result.difficulty.detail}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-paper p-3">
                <p className="text-xs font-black text-ink/45">已完成</p>
                <p className="mt-1 text-2xl font-black text-ink">{result.completed}</p>
              </div>
              <div className="rounded-lg bg-paper p-3">
                <p className="text-xs font-black text-ink/45">剩余</p>
                <p className="mt-1 text-2xl font-black text-ink">{result.remaining}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft sm:p-5">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-10 w-10 place-items-center rounded-lg ${
              isImpossible ? "bg-[#fff0ec] text-coral" : "bg-mint text-eucalyptus"
            }`}
          >
            {isImpossible ? (
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
          <div>
            <h2 className="text-xl font-black tracking-normal text-ink">智能建议：{result.advice.title}</h2>
            <p className="mt-1 text-sm text-ink/55">
              根据你的目标和剩余课程数量生成，适合澳洲大学 7 分制 GPA 场景。
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {result.advice.items.map((item, index) => (
            <div key={item} className="rounded-lg border border-ink/10 bg-paper p-4">
              <div className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-white text-sm font-black text-eucalyptus">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-ink/72">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-ink/10 bg-white/80 p-4">
          <BookOpenCheck className="h-5 w-5 text-eucalyptus" aria-hidden="true" />
          <p className="mt-3 text-sm font-black text-ink">公式</p>
          <p className="mt-1 text-sm leading-6 text-ink/60">
            剩余平均 =（目标 GPA × 总课程数 - 当前 GPA × 已完成课程数）÷ 剩余课程数
          </p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/80 p-4">
          <Target className="h-5 w-5 text-ocean" aria-hidden="true" />
          <p className="mt-3 text-sm font-black text-ink">难度区间</p>
          <p className="mt-1 text-sm leading-6 text-ink/60">
            ≤5.5 轻松，5.5-6.2 中等，6.2-6.7 困难，超过 6.7 非常困难。
          </p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/80 p-4">
          <GraduationCap className="h-5 w-5 text-coral" aria-hidden="true" />
          <p className="mt-3 text-sm font-black text-ink">提醒</p>
          <p className="mt-1 text-sm leading-6 text-ink/60">
            不同学校和学院可能有自己的 GPA 或 WAM 规则，正式用途请以学校说明为准。
          </p>
        </div>
      </section>
    </div>
  );
}
