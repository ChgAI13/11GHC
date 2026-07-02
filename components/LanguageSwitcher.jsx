"use client";

import { Globe2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage, messages } = useLanguage();
  const options = compact
    ? [
        { key: "en", label: "EN" },
        { key: "zh", label: "中" }
      ]
    : [
        { key: "en", label: messages.common.english },
        { key: "zh", label: messages.common.chinese }
      ];

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-[#e5e5ea] bg-[#f5f5f7] p-1 dark:border-[#3a3a3c] dark:bg-[#1c1c1e]"
      aria-label={messages.common.language}
    >
      <span className="grid h-8 w-8 place-items-center text-[#51247a] dark:text-[#d8b4fe]">
        <Globe2 className="h-4 w-4" aria-hidden="true" />
      </span>
      {options.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
            language === item.key
              ? "bg-white text-[#1d1d1f] shadow-[0_1px_2px_rgba(0,0,0,0.06)] dark:bg-[#2c2c2e] dark:text-white"
              : "text-[#86868b] hover:text-[#1d1d1f] dark:text-[#a1a1a6] dark:hover:text-white"
          }`}
          onClick={() => setLanguage(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
