"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Home, MailSearch, WalletCards } from "lucide-react";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/gpa-calculator", label: "GPA", icon: Calculator },
  { href: "/living-cost-calculator", label: "预算", icon: WalletCards },
  { href: "/ai-email-explainer", label: "邮件", icon: MailSearch }
];

export function AppShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="返回首页">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-eucalyptus text-base font-black text-white">
              AU
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-black leading-tight text-ink sm:text-base">
                留学生 AI 助手
              </span>
              <span className="block truncate text-xs font-medium text-ink/55">
                GPA · 预算 · 邮件解释
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="主导航">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold transition ${
                    active
                      ? "bg-mint text-eucalyptus"
                      : "text-ink/70 hover:bg-white hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-white/95 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-10px_30px_rgba(23,33,31,0.10)] backdrop-blur md:hidden"
        aria-label="底部导航"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-bold transition ${
                  active
                    ? "bg-mint text-eucalyptus"
                    : "text-ink/55 hover:bg-paper hover:text-ink"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
