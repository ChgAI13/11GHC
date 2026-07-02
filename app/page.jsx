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

const featureCards = [
  {
    emoji: "🎓",
    title: "Degree Planner",
    description: "Plan your entire degree semester by semester.",
    href: "/course-planner"
  },
  {
    emoji: "📈",
    title: "GPA Planner",
    description: "Estimate your GPA before results are released.",
    href: "/gpa"
  },
  {
    emoji: "✅",
    title: "Graduation Checker",
    description: "Know exactly what you still need to graduate.",
    href: "/graduation"
  },
  {
    emoji: "🧠",
    title: "Smart Recommendations",
    description: "Receive course suggestions based on your profile and graduation rules.",
    href: "/course-planner"
  }
];

const whyItems = [
  {
    icon: FileSearch,
    title: "Stop reading handbook PDFs",
    description: "Turn program requirements into a clear roadmap you can actually use."
  },
  {
    icon: MessageSquareOff,
    title: "No repeated prompts like ChatGPT",
    description: "Your profile, completed courses, and degree rules stay connected in one workflow."
  },
  {
    icon: Layers3,
    title: "Everything in one place",
    description: "GPA planning, course planning, graduation checks, and recommendations work together."
  }
];

const steps = [
  "Create your Academic Profile",
  "Plan your semesters",
  "Track graduation progress",
  "Graduate with confidence"
];

const comingSoon = [
  { label: "Commerce", icon: BriefcaseBusiness },
  { label: "Business", icon: Building2 },
  { label: "Engineering", icon: HardHat },
  { label: "Multiple Universities", icon: School },
  { label: "Cloud Sync", icon: Cloud },
  { label: "AI Study Planner", icon: Brain }
];

const previewRows = [
  { label: "Semester roadmap", value: "6 semesters", width: "86%" },
  { label: "Graduation progress", value: "62%", width: "62%" },
  { label: "GPA target", value: "6.2", width: "74%" }
];

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

function FeatureCard({ feature }) {
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
        Open feature
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

function HeroPreview() {
  return (
    <div className={`${cardClass} p-5 sm:p-6`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
            Degree Roadmap
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
            Bachelor of Economics
          </p>
        </div>
        <span className="rounded-full border border-[#e5e5ea] bg-[#fbfbfd] px-3 py-1 text-xs font-semibold text-[#51247a] dark:border-[#3a3a3c] dark:bg-[#2c2c2e] dark:text-[#d8b4fe]">
          Beta
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        {previewRows.map((row) => (
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
            GPA estimate ready
          </p>
        </div>
        <div className="rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-4 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]">
          <ShieldCheck className="h-5 w-5 text-[#51247a] dark:text-[#d8b4fe]" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-[#1d1d1f] dark:text-white">
            Rules checked
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative py-10 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white/80 px-3 py-1.5 text-sm font-semibold text-[#51247a] backdrop-blur-xl dark:border-[#2c2c2e] dark:bg-[#1c1c1e]/80 dark:text-[#d8b4fe]">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              GradPlan Beta
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-normal text-[#1d1d1f] dark:text-white sm:text-7xl">
              Plan Your Degree.
              <br />
              Not Your Spreadsheets.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6e6e73] dark:text-[#c7c7cc]">
              GradPlan helps university students plan every semester, track graduation progress,
              estimate GPA, and make smarter course decisions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/profile"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-5 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
              >
                Start Planning
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-5 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7] dark:border-[#3a3a3c] dark:bg-[#1c1c1e] dark:text-white dark:hover:bg-[#2c2c2e]"
              >
                Explore Features
              </Link>
            </div>
          </div>

          <HeroPreview />
        </div>
      </section>

      <section id="features" className="py-10 sm:py-14">
        <SectionHeading
          eyebrow="Core features"
          title="Built for degree planning, not one-off answers."
          description="Each feature connects to the same academic profile, so planning feels structured instead of scattered."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <SectionHeading eyebrow="Why GradPlan?" title="Why GradPlan?" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {whyItems.map((item) => {
            const Icon = item.icon;
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
          eyebrow="How it works"
          title="Four steps from messy planning to a clear roadmap."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step} className={`${cardClass} p-6`}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
                  Step {index + 1}
                </span>
                {index < steps.length - 1 ? (
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
              Current Support
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
              University of Queensland
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#6e6e73] dark:text-[#c7c7cc]">
              Bachelor of Economics
            </p>
            <span className="mt-6 inline-flex rounded-full border border-[#e5e5ea] bg-[#fbfbfd] px-3 py-1 text-xs font-semibold text-[#51247a] dark:border-[#3a3a3c] dark:bg-[#2c2c2e] dark:text-[#d8b4fe]">
              Beta
            </span>
          </article>

          <article className={`${cardClass} p-6 sm:p-8`}>
            <p className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
              Coming Soon
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {comingSoon.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] px-4 py-3 dark:border-[#3a3a3c] dark:bg-[#2c2c2e]"
                  >
                    <Icon className="h-4 w-4 text-[#51247a] dark:text-[#d8b4fe]" aria-hidden="true" />
                    <span className="text-sm font-semibold text-[#1d1d1f] dark:text-white">
                      {item.label}
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
            Replace scattered planning with one clear academic roadmap.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6e6e73] dark:text-[#c7c7cc]">
            Start with your Academic Profile, then let GradPlan connect GPA planning,
            semester planning, and graduation progress.
          </p>
          <Link
            href="/profile"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-5 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
          >
            Start Planning
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
