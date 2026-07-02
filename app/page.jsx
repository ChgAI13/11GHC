"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  Brain,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Cloud,
  FileSearch,
  GraduationCap,
  HardHat,
  Layers3,
  LineChart,
  MessageSquareOff,
  School,
  ShieldCheck
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const whyIcons = [FileSearch, MessageSquareOff, Layers3];
const comingSoonIcons = [BriefcaseBusiness, Building2, HardHat, School, Cloud, Brain];

const cardClass =
  "rounded-lg border border-[#e5e5ea] bg-white/85 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-[#2c2c2e] dark:bg-[#1c1c1e]/80";

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-normal text-[#1d1d1f] dark:text-white sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-[#6e6e73] dark:text-[#c7c7cc]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function FeatureCard({ feature, actionLabel }) {
  return (
    <Link href={feature.href} className={`${cardClass} block p-5 transition hover:-translate-y-0.5 hover:border-[#51247a]/30 hover:shadow-[0_16px_40px_rgba(81,36,122,0.10)]`}>
      <div className="text-3xl" aria-hidden="true">
        {feature.emoji}
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
        {feature.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#6e6e73] dark:text-[#c7c7cc]">
        {feature.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
        {actionLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

function HeroPreview({ t }) {
  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
            {t.preview.title}
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
            {t.preview.program}
          </p>
        </div>
        <span className="rounded-full border border-[#e5e5ea] bg-[#fbfbfd] px-3 py-1 text-xs font-semibold text-[#51247a] dark:border-[#3a3a3c] dark:bg-[#2c2c2e] dark:text-[#d8b4fe]">
          {t.preview.beta}
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {t.preview.rows.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-medium text-[#6e6e73] dark:text-[#c7c7cc]">{row.label}</span>
              <span className="font-semibold text-[#1d1d1f] dark:text-white">{row.value}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e]">
              <div className="h-full rounded-full bg-[#51247a]" style={{ width: row.width }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-4 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]">
          <LineChart className="h-5 w-5 text-[#51247a] dark:text-[#d8b4fe]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f] dark:text-white">
            {t.preview.gpaReady}
          </p>
        </div>
        <div className="rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-4 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]">
          <ShieldCheck className="h-5 w-5 text-[#51247a] dark:text-[#d8b4fe]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f] dark:text-white">
            {t.preview.rulesChecked}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { messages } = useLanguage();
  const t = messages.landing;

  return (
    <div className="overflow-hidden">
      <section className="relative py-10 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white/80 px-3 py-1.5 text-sm font-semibold text-[#51247a] backdrop-blur-xl dark:border-[#2c2c2e] dark:bg-[#1c1c1e]/80 dark:text-[#d8b4fe]">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              {t.badge}
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-normal text-[#1d1d1f] dark:text-white sm:text-7xl">
              {t.titleLine1}
              <br />
              {t.titleLine2}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6e6e73] dark:text-[#c7c7cc]">
              {t.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/profile"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-5 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
              >
                {t.primaryCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-5 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7] dark:border-[#3a3a3c] dark:bg-[#1c1c1e] dark:text-white dark:hover:bg-[#2c2c2e]"
              >
                {t.secondaryCta}
              </Link>
            </div>
          </div>

          <HeroPreview t={t} />
        </div>
      </section>

      <section id="features" className="py-10 sm:py-14">
        <SectionHeading
          eyebrow={t.featureSection.eyebrow}
          title={t.featureSection.title}
          description={t.featureSection.description}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {t.features.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              actionLabel={t.featureSection.openFeature}
            />
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {t.why.items.map((item, index) => {
            const Icon = whyIcons[index];
            return (
              <article key={item.title} className={`${cardClass} p-6`}>
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a] dark:bg-[#2c2c2e] dark:text-[#d8b4fe]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6e6e73] dark:text-[#c7c7cc]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <SectionHeading
          eyebrow={t.how.eyebrow}
          title={t.how.title}
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {t.how.steps.map((step, index) => (
            <article key={step} className={`${cardClass} p-6`}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
                  {t.how.step} {index + 1}
                </span>
                {index < t.how.steps.length - 1 ? (
                  <ArrowDown className="h-4 w-4 text-[#86868b] lg:-rotate-90" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-[#51247a] dark:text-[#d8b4fe]" aria-hidden="true" />
                )}
              </div>
              <h3 className="mt-6 min-h-14 text-xl font-semibold leading-7 tracking-normal text-[#1d1d1f] dark:text-white">
                {step}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <article className={`${cardClass} p-6 sm:p-8`}>
            <p className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
              {t.support.title}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
              {t.support.university}
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#6e6e73] dark:text-[#c7c7cc]">
              {t.support.program}
            </p>
            <span className="mt-6 inline-flex rounded-full border border-[#e5e5ea] bg-[#fbfbfd] px-3 py-1 text-xs font-semibold text-[#51247a] dark:border-[#3a3a3c] dark:bg-[#2c2c2e] dark:text-[#d8b4fe]">
              {t.support.beta}
            </span>
          </article>

          <article className={`${cardClass} p-6 sm:p-8`}>
            <p className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
              {t.comingSoon.title}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.comingSoon.items.map((item, index) => {
                const Icon = comingSoonIcons[index];
                return (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] px-4 py-3 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]"
                  >
                    <Icon className="h-4 w-4 text-[#51247a] dark:text-[#d8b4fe]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-6 text-center dark:border-[#2c2c2e] dark:bg-[#1c1c1e] sm:p-10">
          <BookOpenCheck className="mx-auto h-9 w-9 text-[#51247a] dark:text-[#d8b4fe]" aria-hidden="true" />
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-normal text-[#1d1d1f] dark:text-white sm:text-5xl">
            {t.finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6e6e73] dark:text-[#c7c7cc]">
            {t.finalCta.description}
          </p>
          <Link
            href="/profile"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-5 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
          >
            {t.finalCta.button}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
