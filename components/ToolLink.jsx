import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ToolLink({ href, icon: Icon, title, description, tone = "mint" }) {
  const tones = {
    mint: "bg-mint text-eucalyptus",
    coral: "bg-[#ffe4dd] text-coral",
    ocean: "bg-[#e0f1f7] text-ocean"
  };

  return (
    <Link
      href={href}
      className="surface group block p-4 transition hover:-translate-y-0.5 hover:border-eucalyptus/30 sm:p-5"
    >
      <div className="flex items-start gap-4">
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-black text-ink">{title}</span>
          <span className="mt-1 block text-sm leading-6 text-ink/65">{description}</span>
        </span>
        <ArrowRight
          className="mt-1 h-5 w-5 shrink-0 text-ink/35 transition group-hover:translate-x-1 group-hover:text-eucalyptus"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
