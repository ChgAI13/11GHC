"use client";

import { useMemo } from "react";
import {
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Gauge,
  GraduationCap,
  Library,
  Target
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { useProfile } from "@/components/ProfileProvider";
import { uqBachelorOfEconomicsCourses } from "@/data/courses";
import { uqBachelorOfEconomicsGraduationRules } from "@/data/graduationRules";
import { checkGraduation } from "@/lib/graduationChecker";
import {
  recommendCourses,
  uqBachelorOfEconomicsProgram
} from "@/lib/recommendationEngine";

const progressCircle = {
  radius: 54,
  circumference: 339.292
};

const copy = {
  zh: {
    university: "University of Queensland",
    title: "UQ Academic Planner",
    intro: "为 UQ 经济学学士学生设计的学业规划工作台。集中查看 GPA、课程进度、毕业要求和下一步选课方向。",
    programLabel: "当前项目",
    program: "Bachelor of Economics",
    cohort: "2026 学业规划视图",
    stats: [
      { label: "当前 GPA", value: "5.82", helper: "基于已完成课程", icon: Gauge },
      { label: "目标 GPA", value: "6.20", helper: "毕业目标", icon: Target },
      { label: "已完成课程", value: "16", helper: "32 units 已完成", icon: CheckCircle2 },
      { label: "剩余课程", value: "8", helper: "16 units 待完成", icon: BookOpen }
    ],
    academicProgress: {
      section: "Academic Progress",
      title: "学业要求完成度",
      percent: "45%",
      description: "核心课、选修课和 Level 3 要求正在逐步补齐。"
    },
    progressItems: [
      { label: "经济学核心课", value: "10 / 12", width: "83%" },
      { label: "经济学选修课", value: "4 / 8", width: "50%" },
      { label: "Level 3 课程要求", value: "6 / 18 units", width: "33%" }
    ],
    actionsSection: "Recommended Actions",
    actionsTitle: "下一步建议",
    actions: [
      "下学期优先完成 ECON2010，避免核心课堆到最后一年。",
      "你还需要 18 units 的 Level 3 课程，请提前规划高年级 ECON 课程。",
      "当前学习负荷比较均衡，可以继续保持每学期 4 门课节奏。"
    ],
    degreeProgress: {
      section: "Degree Progress",
      title: "学位完成进度",
      percent: "67%",
      completed: "16 门已完成",
      remaining: "8 门剩余"
    },
    quickActions: {
      section: "Quick Actions",
      title: "快速进入",
      comingSoon: "暂未开放",
      items: [
        { label: "打开 GPA Planner", href: "/gpa", available: true },
        { label: "打开 Course Planner", href: "/course-planner", available: true },
        { label: "打开 Graduation Checker", href: "/graduation", available: true }
      ]
    }
  },
  en: {
    university: "University of Queensland",
    title: "UQ Academic Planner",
    intro:
      "A focused academic planning workspace for UQ Bachelor of Economics students. Track GPA, course progress, graduation requirements, and next course decisions.",
    programLabel: "Current program",
    program: "Bachelor of Economics",
    cohort: "2026 planning view",
    stats: [
      { label: "Current GPA", value: "5.82", helper: "Based on completed courses", icon: Gauge },
      { label: "Target GPA", value: "6.20", helper: "Graduation target", icon: Target },
      { label: "Completed Courses", value: "16", helper: "32 units completed", icon: CheckCircle2 },
      { label: "Remaining Courses", value: "8", helper: "16 units remaining", icon: BookOpen }
    ],
    academicProgress: {
      section: "Academic Progress",
      title: "Requirement completion",
      percent: "45%",
      description: "Core, elective, and Level 3 requirements are being mapped into the plan."
    },
    progressItems: [
      { label: "Economics core courses", value: "10 / 12", width: "83%" },
      { label: "Economics electives", value: "4 / 8", width: "50%" },
      { label: "Level 3 requirement", value: "6 / 18 units", width: "33%" }
    ],
    actionsSection: "Recommended Actions",
    actionsTitle: "Next actions",
    actions: [
      "Complete ECON2010 next semester to avoid leaving core courses until the final year.",
      "You still need 18 units of Level 3 courses, so plan upper-level ECON options early.",
      "Current study load is balanced. Keeping four courses per semester is a reasonable path."
    ],
    degreeProgress: {
      section: "Degree Progress",
      title: "Degree completion",
      percent: "67%",
      completed: "16 courses completed",
      remaining: "8 courses remaining"
    },
    quickActions: {
      section: "Quick Actions",
      title: "Open planner",
      comingSoon: "Coming soon",
      items: [
        { label: "Open GPA Planner", href: "/gpa", available: true },
        { label: "Open Course Planner", href: "/course-planner", available: true },
        { label: "Open Graduation Checker", href: "/graduation", available: true }
      ]
    }
  }
};

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className={`${panelClass} p-5`}>
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-5 text-sm font-medium text-[#6e6e73]">{item.label}</p>
      <p className="mt-1 text-4xl font-semibold tracking-normal text-[#1d1d1f]">{item.value}</p>
      <p className="mt-2 text-sm leading-6 text-[#86868b]">{item.helper}</p>
    </div>
  );
}

function QuickAction({ action, comingSoon }) {
  const className =
    "flex min-h-12 w-full items-center justify-between gap-3 rounded-lg px-4 text-left text-sm font-semibold transition";

  if (!action.available) {
    return (
      <button
        type="button"
        className={`${className} cursor-not-allowed border border-[#e5e5ea] bg-[#fbfbfd] text-[#a1a1a6]`}
        disabled
        title={comingSoon}
      >
        <span>{action.label}</span>
        <span className="text-xs font-medium">{comingSoon}</span>
      </button>
    );
  }

  return (
    <Link
      href={action.href}
      className={`${className} border border-[#51247a] bg-[#51247a] text-white hover:bg-[#3f1c62]`}
    >
      <span>{action.label}</span>
      <ChevronRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export default function DashboardPage() {
  const { language } = useLanguage();
  const { profile } = useProfile();
  const t = copy[language];
  const graduationResult = useMemo(
    () =>
      checkGraduation(
        profile,
        uqBachelorOfEconomicsCourses,
        uqBachelorOfEconomicsGraduationRules
      ),
    [profile]
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
  const completedCourseCount = profile.completedCourses.length;
  const remainingCourseCount = Math.max(
    uqBachelorOfEconomicsCourses.length - completedCourseCount,
    0
  );
  const degreePercent = graduationResult.overallProgress;
  const strokeOffset =
    progressCircle.circumference -
    (degreePercent / 100) * progressCircle.circumference;
  const statValues = [
    {
      value: profile.currentGpa || "-",
      helper: language === "zh" ? "来自 Academic Profile" : "From Academic Profile"
    },
    {
      value: profile.targetGpa || "-",
      helper: language === "zh" ? "来自 Academic Profile" : "From Academic Profile"
    },
    {
      value: String(completedCourseCount),
      helper:
        language === "zh"
          ? `${graduationResult.totalCompletedUnits} units 已完成`
          : `${graduationResult.totalCompletedUnits} units completed`
    },
    {
      value: String(remainingCourseCount),
      helper:
        language === "zh"
          ? `${graduationResult.missingUnits} units 待完成`
          : `${graduationResult.missingUnits} units remaining`
    }
  ];
  const dashboardStats = t.stats.map((item, index) => ({
    ...item,
    ...statValues[index]
  }));
  const progressRequirementKeys = ["core-courses", "electives", "level-3"];
  const dashboardProgressItems = t.progressItems.map((item, index) => {
    const requirement = graduationResult.requirementStatuses.find(
      (status) => status.key === progressRequirementKeys[index]
    );

    if (!requirement) {
      return item;
    }

    return {
      ...item,
      value: `${requirement.completedUnits} / ${requirement.requiredUnits} units`,
      width: `${requirement.progress}%`
    };
  });
  const topRecommendation = recommendationResult.recommendedCourses[0]?.course.code;
  const dashboardActions =
    language === "zh"
      ? [
          topRecommendation
            ? `下学期优先考虑 ${topRecommendation}，它最符合当前 Profile 和毕业进度。`
            : "先到 Academic Profile 填写 Current GPA 和已完成课程。",
          `你还需要 ${graduationResult.missingUnits} units 才能达到当前 Mock Degree Rules。`,
          `当前偏好的学习负荷是 ${profile.preferredWorkload}，Course Planner 会按这个节奏推荐课程。`
        ]
      : [
          topRecommendation
            ? `Prioritise ${topRecommendation} next semester based on your Profile and degree progress.`
            : "Complete your Current GPA and completed courses in Academic Profile first.",
          `You still need ${graduationResult.missingUnits} units under the current mock degree rules.`,
          `Your preferred workload is ${profile.preferredWorkload}, and Course Planner will use that pace.`
        ];
  const degreeCompletedText =
    language === "zh"
      ? `${completedCourseCount} 门已完成`
      : `${completedCourseCount} courses completed`;
  const degreeRemainingText =
    language === "zh"
      ? `${remainingCourseCount} 门剩余`
      : `${remainingCourseCount} courses remaining`;

  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="grid gap-7">
        <section className="pt-2 sm:pt-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
                <GraduationCap className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
                {profile.university}
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#1d1d1f] sm:text-6xl">
                {t.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg">
                {t.intro}
              </p>
            </div>

            <div className={`${panelClass} p-5`}>
              <p className="text-sm font-medium text-[#6e6e73]">{t.programLabel}</p>
              <p className="mt-2 text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                {profile.program}
              </p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e5e5ea] pt-4">
                <span className="text-sm font-medium text-[#86868b]">{t.cohort}</span>
                <span className="rounded-full border border-[#e5e5ea] bg-[#fbfbfd] px-3 py-1 text-xs font-semibold text-[#51247a]">
                  UQ
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </section>

        <section className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">{t.academicProgress.section}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                {t.academicProgress.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#6e6e73]">
                {t.academicProgress.description}
              </p>
            </div>
            <p className="text-5xl font-semibold tracking-normal text-[#51247a]">
              {degreePercent}%
            </p>
          </div>

          <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-[#f5f5f7]">
            <div className="h-full rounded-full bg-[#51247a]" style={{ width: `${degreePercent}%` }} />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {dashboardProgressItems.map((item) => (
              <div key={item.label} className={`${softPanelClass} p-4`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#1d1d1f]">{item.label}</p>
                  <p className="text-sm font-medium text-[#6e6e73]">{item.value}</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5e5ea]">
                  <div className="h-full rounded-full bg-[#51247a]" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">{t.actionsSection}</p>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                {t.actionsTitle}
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {dashboardActions.map((action) => (
              <div key={action} className={`${softPanelClass} p-4`}>
                <div className="flex items-start gap-3">
                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#51247a]">
                    <Library className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium leading-6 text-[#1d1d1f]">{action}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="grid gap-4 xl:sticky xl:top-24 xl:self-start">
        <section className={`${panelClass} p-5 sm:p-6`}>
          <p className="text-sm font-medium text-[#6e6e73]">{t.quickActions.section}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-normal text-[#1d1d1f]">
            {t.quickActions.title}
          </h2>
          <div className="mt-5 grid gap-3">
            {t.quickActions.items.map((action) => (
              <QuickAction
                key={action.label}
                action={action}
                comingSoon={t.quickActions.comingSoon}
              />
            ))}
          </div>
        </section>

        <section className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#6e6e73]">{t.degreeProgress.section}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                {t.degreeProgress.title}
              </h2>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
              <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-6 grid place-items-center">
            <div className="relative h-40 w-40">
              <svg className="h-40 w-40 -rotate-90" viewBox="0 0 140 140" aria-hidden="true">
                <circle
                  cx="70"
                  cy="70"
                  r={progressCircle.radius}
                  fill="none"
                  stroke="#f5f5f7"
                  strokeWidth="12"
                />
                <circle
                  cx="70"
                  cy="70"
                  r={progressCircle.radius}
                  fill="none"
                  stroke="#51247a"
                  strokeLinecap="round"
                  strokeWidth="12"
                  strokeDasharray={progressCircle.circumference}
                  strokeDashoffset={strokeOffset}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-4xl font-semibold tracking-normal text-[#1d1d1f]">
                    {degreePercent}%
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#86868b]">UQ BEcon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <div className={`${softPanelClass} p-4`}>
              <p className="text-sm font-semibold text-[#1d1d1f]">{degreeCompletedText}</p>
            </div>
            <div className={`${softPanelClass} p-4`}>
              <p className="text-sm font-semibold text-[#1d1d1f]">{degreeRemainingText}</p>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}
