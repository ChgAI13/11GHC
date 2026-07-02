import Link from "next/link";
import {
  CONTACT_EMAIL,
  SITE_BUILD_DATE,
  SITE_VERSION,
  UQ_PROGRAMS_COURSES_URL
} from "@/lib/siteMeta";

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/terms", label: "Terms" }
];

export function LegalPage({ eyebrow, title, intro, sections, metadata, officialLink = false }) {
  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-lg border border-[#e5e5ea] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[#2c2c2e] dark:bg-[#1c1c1e] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-normal text-[#51247a] dark:text-[#bf9df7]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-[#1d1d1f] dark:text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-[#6e6e73] dark:text-[#c7c7cc]">
          {intro}
        </p>
      </section>

      <div className="mt-6 grid gap-4">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-5 dark:border-[#2c2c2e] dark:bg-[#111113] sm:p-6"
          >
            <h2 className="text-xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
              {section.title}
            </h2>
            <div className="mt-4 grid gap-3">
              {section.items.map((item) => (
                <p key={item} className="text-sm leading-7 text-[#6e6e73] dark:text-[#c7c7cc]">
                  {item}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {metadata ? (
        <section className="mt-6 rounded-lg border border-[#e5e5ea] bg-white p-5 dark:border-[#2c2c2e] dark:bg-[#1c1c1e] sm:p-6">
          <h2 className="text-xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
            Product Information
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-4 dark:border-[#2c2c2e] dark:bg-[#111113]">
              <p className="text-xs font-semibold uppercase text-[#86868b]">Version</p>
              <p className="mt-2 text-sm font-semibold text-[#1d1d1f] dark:text-white">
                {SITE_VERSION}
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-4 dark:border-[#2c2c2e] dark:bg-[#111113]">
              <p className="text-xs font-semibold uppercase text-[#86868b]">Build Date</p>
              <p className="mt-2 text-sm font-semibold text-[#1d1d1f] dark:text-white">
                {SITE_BUILD_DATE}
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e5ea] bg-[#fbfbfd] p-4 dark:border-[#2c2c2e] dark:bg-[#111113]">
              <p className="text-xs font-semibold uppercase text-[#86868b]">Contact Email</p>
              <p className="mt-2 text-sm font-semibold text-[#1d1d1f] dark:text-white">
                {CONTACT_EMAIL}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {officialLink ? (
        <section className="mt-6 rounded-lg border border-[#e5e5ea] bg-white p-5 dark:border-[#2c2c2e] dark:bg-[#1c1c1e] sm:p-6">
          <h2 className="text-xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white">
            Official UQ Programs and Courses
          </h2>
          <a
            href={UQ_PROGRAMS_COURSES_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#51247a] transition hover:bg-[#f5f5f7] dark:border-[#3a3a3c] dark:bg-[#111113] dark:text-[#bf9df7] dark:hover:bg-[#1c1c1e]"
          >
            Open official UQ Programs and Courses
          </a>
        </section>
      ) : null}

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Legal pages">
        {legalLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-[#e5e5ea] bg-white px-4 py-2 text-sm font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f] dark:border-[#3a3a3c] dark:bg-[#1c1c1e] dark:text-[#c7c7cc] dark:hover:bg-[#2c2c2e] dark:hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
