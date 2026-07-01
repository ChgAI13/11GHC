"use client";

import { useMemo, useState } from "react";
import { Banknote, TrendingDown, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const initialBudget = {
  rent: 320,
  food: 120,
  transport: 45,
  phone: 12,
  entertainment: 80,
  income: 520
};

const fields = [
  { key: "rent", label: "房租 / 周", placeholder: "320" },
  { key: "food", label: "吃饭 / 周", placeholder: "120" },
  { key: "transport", label: "交通 / 周", placeholder: "45" },
  { key: "phone", label: "电话费 / 周", placeholder: "12" },
  { key: "entertainment", label: "娱乐 / 周", placeholder: "80" },
  { key: "income", label: "打工收入 / 周", placeholder: "520" }
];

function money(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0
  }).format(value);
}

export default function LivingCostCalculatorPage() {
  const [budget, setBudget] = useState(initialBudget);

  const totals = useMemo(() => {
    const weeklyExpense =
      Number(budget.rent || 0) +
      Number(budget.food || 0) +
      Number(budget.transport || 0) +
      Number(budget.phone || 0) +
      Number(budget.entertainment || 0);
    const weeklyIncome = Number(budget.income || 0);
    const weeklyBalance = weeklyIncome - weeklyExpense;

    return {
      weeklyExpense,
      monthlyExpense: weeklyExpense * 4.33,
      weeklyIncome,
      monthlyIncome: weeklyIncome * 4.33,
      weeklyBalance,
      monthlyBalance: weeklyBalance * 4.33
    };
  }, [budget]);

  const isOverspending = totals.weeklyBalance < 0;

  function updateBudget(key, value) {
    setBudget((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      <section className="surface p-4 sm:p-6">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-coral">Budget</p>
        <h1 className="mt-2 text-3xl font-black tracking-normal text-ink">
          Living Cost Calculator
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">
          输入每周房租、吃饭、交通、电话费、娱乐和打工收入，自动换算每周/月预算。
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.key}>
              <span className="field-label">{field.label}</span>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-[calc(50%+0.25rem)] -translate-y-1/2 text-sm font-black text-ink/35">
                  $
                </span>
                <input
                  className="field-input pl-7"
                  type="number"
                  min="0"
                  inputMode="decimal"
                  value={budget[field.key]}
                  onChange={(event) => updateBudget(field.key, event.target.value)}
                  placeholder={field.placeholder}
                />
              </div>
            </label>
          ))}
        </div>

        <div
          className={`mt-6 rounded-lg border p-4 ${
            isOverspending
              ? "border-coral/25 bg-[#fff0ec] text-coral"
              : "border-eucalyptus/25 bg-mint text-eucalyptus"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white">
              {isOverspending ? (
                <TrendingDown className="h-5 w-5" aria-hidden="true" />
              ) : (
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
            <div>
              <p className="font-black">
                {isOverspending ? "当前预算超支" : "当前预算没有超支"}
              </p>
              <p className="mt-1 text-sm leading-6 text-ink/65">
                {isOverspending
                  ? `每周还差 ${money(Math.abs(totals.weeklyBalance))}，建议优先检查房租、外食和娱乐支出。`
                  : `每周预计结余 ${money(totals.weeklyBalance)}，可以留出一部分作为应急金。`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <aside className="grid gap-4 lg:sticky lg:top-24">
        <StatCard
          label="每周支出"
          value={money(totals.weeklyExpense)}
          helper={`每周收入 ${money(totals.weeklyIncome)}`}
        />
        <StatCard
          label="每月支出"
          value={money(totals.monthlyExpense)}
          helper={`按 4.33 周估算，每月收入 ${money(totals.monthlyIncome)}`}
        />
        <StatCard
          label={isOverspending ? "每周缺口" : "每周结余"}
          value={money(Math.abs(totals.weeklyBalance))}
          helper={`每月${isOverspending ? "缺口" : "结余"}约 ${money(Math.abs(totals.monthlyBalance))}`}
          tone={isOverspending ? "warn" : "good"}
        />
        <div className="rounded-lg border border-ink/10 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <Banknote className="h-4 w-4 text-gold" aria-hidden="true" />
            MVP 提示
          </div>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            后续可以加入城市选择、租房类型、汇率和学生签证打工时长提醒。
          </p>
        </div>
      </aside>
    </div>
  );
}
