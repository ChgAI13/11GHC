import { Calculator, MailSearch, MapPinned, WalletCards } from "lucide-react";
import { ToolLink } from "@/components/ToolLink";
import { StatCard } from "@/components/StatCard";

export default function HomePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
      <section className="overflow-hidden rounded-lg bg-ink text-white shadow-soft">
        <div className="grid gap-6 p-6 sm:p-8 lg:min-h-[520px] lg:grid-rows-[1fr_auto]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-bold text-white/85">
              <MapPinned className="h-4 w-4" aria-hidden="true" />
              Australia Student Toolkit
            </div>
            <h1 className="mt-7 max-w-2xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
              澳洲留学生 AI 助手
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              面向澳洲不同大学的留学生，把成绩口径、生活预算和学校邮件这三件常见小麻烦，先做成一个轻量、手机端好用的 MVP。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-2xl font-black">GPA</p>
              <p className="mt-1 text-sm text-white/65">7.0 / 4.0 / WAM</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-2xl font-black">$AUD</p>
              <p className="mt-1 text-sm text-white/65">周/月预算</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-2xl font-black">中文</p>
              <p className="mt-1 text-sm text-white/65">邮件解释</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        <ToolLink
          href="/gpa-calculator"
          icon={Calculator}
          title="GPA Calculator"
          description="添加课程、学分和成绩，支持 7 分制、4 分制和 WAM 加权结果。"
          tone="mint"
        />
        <ToolLink
          href="/living-cost-calculator"
          icon={WalletCards}
          title="Living Cost Calculator"
          description="整理房租、吃饭、交通和打工收入，快速判断每周和每月预算。"
          tone="coral"
        />
        <ToolLink
          href="/ai-email-explainer"
          icon={MailSearch}
          title="AI Email Explainer"
          description="粘贴英文邮件，先用 mock 输出中文解释、日期和行动清单。"
          tone="ocean"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <StatCard label="当前版本" value="MVP" helper="无登录、无数据库、无真实支付。" />
          <StatCard label="适配重点" value="Mobile" helper="所有页面优先照顾手机端输入体验。" />
        </div>
      </section>
    </div>
  );
}
