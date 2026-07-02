"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardCheck,
  Database,
  Gauge,
  LayoutDashboard,
  RotateCcw,
  Settings
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useProfile } from "@/components/ProfileProvider";
import { SITE_VERSION } from "@/lib/siteMeta";

const navItems = [
  { href: "/", key: "dashboard", icon: LayoutDashboard, active: true },
  { href: "/gpa", key: "gpaPlanner", icon: Gauge },
  { href: "/course-planner", key: "coursePlanner", icon: BookOpen },
  { href: "/graduation", key: "graduationChecker", icon: ClipboardCheck },
  { href: "/courses", key: "courseDatabase", icon: Database }
];

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/terms", label: "Terms" }
];

const copy = {
  zh: {
    brand: "UQ Academic Planner",
    subtitle: "经济学学士 MVP",
    settings: "Profile",
    comingSoon: "暂未开放",
    resetAllData: "Reset All Data",
    footerBuiltBy: "Built by a UQ Economics student.",
    footerUnofficial: "Unofficial tool. Not affiliated with The University of Queensland.",
    resetConfirm:
      "确定要清空 Academic Profile 吗？Dashboard、GPA、Course Planner 和 Graduation Checker 会同步重置。",
    nav: {
      dashboard: "仪表盘",
      gpaPlanner: "GPA 规划",
      coursePlanner: "选课规划",
      graduationChecker: "毕业检查",
      courseDatabase: "课程库"
    }
  },
  en: {
    brand: "UQ Academic Planner",
    subtitle: "Bachelor of Economics MVP",
    settings: "Profile",
    comingSoon: "Coming soon",
    resetAllData: "Reset All Data",
    footerBuiltBy: "Built by a UQ Economics student.",
    footerUnofficial: "Unofficial tool. Not affiliated with The University of Queensland.",
    resetConfirm:
      "Clear Academic Profile? Dashboard, GPA Planner, Course Planner, and Graduation Checker will reset together.",
    nav: {
      dashboard: "Dashboard",
      gpaPlanner: "GPA Planner",
      coursePlanner: "Course Planner",
      graduationChecker: "Graduation Checker",
      courseDatabase: "Course Database"
    }
  }
};

function LanguageToggle({ compact = false }) {
  const { language, setLanguage } = useLanguage();
  const options = compact
    ? [
        { key: "zh", label: "中" },
        { key: "en", label: "EN" }
      ]
    : [
        { key: "zh", label: "中文" },
        { key: "en", label: "EN" }
      ];

  return (
    <div className="flex rounded-full border border-[#e5e5ea] bg-[#f5f5f7] p-1">
      {options.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
            language === item.key
              ? "bg-white text-[#1d1d1f] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
              : "text-[#86868b] hover:text-[#1d1d1f]"
          }`}
          onClick={() => setLanguage(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ResetAllDataButton({ label, confirmMessage, resetProfile, compact = false }) {
  function resetAllData() {
    if (!window.confirm(confirmMessage)) {
      return;
    }

    resetProfile();
  }

  if (compact) {
    return (
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e5ea] bg-white text-[#86868b] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
        onClick={resetAllData}
        aria-label={label}
        title={label}
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-3 text-sm font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
      onClick={resetAllData}
    >
      <RotateCcw className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

function NavItem({ item, label, comingSoon, pathname, mobile = false }) {
  const Icon = item.icon;
  const active = item.href !== "#" && pathname === item.href;
  const disabled = item.href === "#";
  const className = mobile
    ? `flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-semibold transition ${
        active
          ? "bg-[#f5f5f7] text-[#1d1d1f]"
          : disabled
            ? "cursor-not-allowed text-[#c7c7cc]"
            : "text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
      }`
    : `flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${
        active
          ? "bg-[#f5f5f7] text-[#1d1d1f]"
          : disabled
            ? "cursor-not-allowed text-[#a1a1a6]"
            : "text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
      }`;

  if (disabled) {
    return (
      <button key={item.key} type="button" className={className} disabled title={comingSoon}>
        <Icon className={mobile ? "h-5 w-5" : "h-5 w-5"} aria-hidden="true" />
        <span className={mobile ? "max-w-full truncate px-1" : ""}>{label}</span>
      </button>
    );
  }

  return (
    <Link key={item.key} href={item.href} className={className}>
      <Icon className={mobile ? "h-5 w-5" : "h-5 w-5"} aria-hidden="true" />
      <span className={mobile ? "max-w-full truncate px-1" : ""}>{label}</span>
    </Link>
  );
}

function AppFooter({ pathname, t }) {
  const showHomeDisclaimer = pathname === "/";

  return (
    <footer className="mx-auto w-full max-w-7xl border-t border-[#e5e5ea] px-4 py-8 text-sm text-[#6e6e73] dark:border-[#2c2c2e] dark:text-[#c7c7cc] sm:px-6">
      {showHomeDisclaimer ? (
        <div className="mb-5 grid gap-1">
          <p className="font-semibold text-[#1d1d1f] dark:text-white">{t.footerBuiltBy}</p>
          <p>{t.footerUnofficial}</p>
        </div>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-3" aria-label="Footer navigation">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-semibold transition hover:text-[#1d1d1f] dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="font-semibold">Version {SITE_VERSION}</p>
      </div>
    </footer>
  );
}

export function AppShell({ children }) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { resetProfile } = useProfile();
  const t = copy[language];
  const navLabel = language === "zh" ? "主导航" : "Main navigation";

  return (
    <div className="min-h-screen bg-white pb-24 text-[#1d1d1f] dark:bg-[#0b0b0c] dark:text-white lg:pb-0">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-0 hidden h-screen border-r border-[#e5e5ea] bg-white px-4 py-5 dark:border-[#2c2c2e] dark:bg-[#111113] lg:flex lg:flex-col">
          <Link href="/" className="flex items-center gap-3 px-2" aria-label="Dashboard">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#51247a] text-sm font-black text-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
              UQ
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-black leading-tight text-[#1d1d1f]">
                {t.brand}
              </span>
              <span className="block truncate text-xs font-medium text-[#6e6e73]">
                {t.subtitle}
              </span>
            </span>
          </Link>

          <nav className="mt-8 grid gap-1" aria-label={navLabel}>
            {navItems.map((item) => (
              <NavItem
                key={item.key}
                item={item}
                label={t.nav[item.key]}
                comingSoon={t.comingSoon}
                pathname={pathname}
              />
            ))}
          </nav>

          <div className="mt-auto rounded-lg bg-[#f5f5f7] p-2">
            <LanguageToggle />
            <ResetAllDataButton
              label={t.resetAllData}
              confirmMessage={t.resetConfirm}
              resetProfile={resetProfile}
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#e5e5ea] bg-white/90 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <Link href="/" className="flex items-center gap-3" aria-label="Dashboard">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#51247a] text-sm font-black text-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                  UQ
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-tight text-[#1d1d1f]">
                    {t.brand}
                  </span>
                  <span className="block truncate text-xs font-medium text-[#6e6e73]">
                    {t.subtitle}
                  </span>
                </span>
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e5ea] bg-white text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                  aria-label={t.settings}
                  title={t.settings}
                >
                  <Settings className="h-4 w-4" aria-hidden="true" />
                </Link>
                <ResetAllDataButton
                  label={t.resetAllData}
                  confirmMessage={t.resetConfirm}
                  resetProfile={resetProfile}
                  compact
                />
                <LanguageToggle compact />
              </div>
            </div>
          </header>

          <header className="hidden border-b border-[#e5e5ea] bg-white px-6 py-5 lg:block">
            <div className="mx-auto flex max-w-7xl items-center justify-end">
              <button
                type="button"
                className="mr-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                onClick={() => {
                  if (!window.confirm(t.resetConfirm)) {
                    return;
                  }

                  resetProfile();
                }}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {t.resetAllData}
              </button>
              <Link
                href="/profile"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                title={t.settings}
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                {t.settings}
              </Link>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>

          <AppFooter pathname={pathname} t={t} />

          <nav
            className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e5e5ea] bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-8px_24px_rgba(0,0,0,0.04)] backdrop-blur-xl lg:hidden"
            aria-label={navLabel}
          >
            <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.key}
                  item={item}
                  label={t.nav[item.key]}
                  comingSoon={t.comingSoon}
                  pathname={pathname}
                  mobile
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
