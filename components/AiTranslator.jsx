"use client";

import { useEffect, useState } from "react";
import { Check, Clipboard, Languages, Sparkles } from "lucide-react";
import { load, save } from "@/lib/storage";
import { translateFullText } from "@/lib/translator";

const sampleText =
  "Dear student,\n\nYour assignment extension request has been approved. Please submit your revised report by Friday, 18 August at 5:00 PM through the online portal.\n\nLearning objectives:\n- Explain supply and demand\n- Discuss opportunity cost\n- Apply market equilibrium\n\n| Task | Weight | Due Date |\n| --- | --- | --- |\n| Assignment | 40% | Week 6 |\n| Final Exam | 60% | Exam period |";

const DEFAULT_TRANSLATOR_STATE = {
  sourceText: sampleText,
  translation: translateFullText(sampleText)
};

const panelClass = "rounded-lg border border-[#e5e5ea] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]";
const softPanelClass = "rounded-lg border border-[#e5e5ea] bg-[#fbfbfd]";

export function AiTranslator() {
  const [sourceText, setSourceText] = useState(DEFAULT_TRANSLATOR_STATE.sourceText);
  const [translation, setTranslation] = useState(DEFAULT_TRANSLATOR_STATE.translation);
  const [copyState, setCopyState] = useState("idle");
  const [hasLoadedSavedValues, setHasLoadedSavedValues] = useState(false);

  useEffect(() => {
    const savedValues = load("translator", DEFAULT_TRANSLATOR_STATE);

    if (typeof savedValues.sourceText === "string") {
      setSourceText(savedValues.sourceText);
    }

    if (typeof savedValues.translation === "string") {
      setTranslation(savedValues.translation);
    }

    setHasLoadedSavedValues(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedSavedValues) {
      return;
    }

    save("translator", {
      sourceText,
      translation
    });
  }, [sourceText, translation, hasLoadedSavedValues]);

  function translateText(event) {
    event.preventDefault();
    setTranslation(translateFullText(sourceText));
    setCopyState("idle");
  }

  async function copyTranslation() {
    await navigator.clipboard.writeText(translation);
    setCopyState("copied");
    window.setTimeout(() => setCopyState("idle"), 1800);
  }

  return (
    <div className="grid gap-7">
      <section className="pt-2 sm:pt-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5ea] bg-white px-3 py-1.5 text-sm font-medium text-[#6e6e73]">
              <Languages className="h-4 w-4 text-[#51247a]" aria-hidden="true" />
              AI Translator
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-[#1d1d1f] sm:text-6xl">
              Full Text Translator
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg">
              粘贴英文句子、邮件、Assignment 或 Lecture Notes，完整保留段落、列表和表格格式。
            </p>
          </div>

          <div className={`${panelClass} p-5`}>
            <p className="text-sm font-medium text-[#6e6e73]">Translation Mode</p>
            <p className="mt-2 text-2xl font-semibold tracking-normal text-[#1d1d1f]">
              Full Input
            </p>
            <p className="mt-4 border-t border-[#e5e5ea] pt-4 text-sm leading-6 text-[#6e6e73]">
              当前使用本地 mock translator，不连接 OpenAI，不截断输入。
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
        <form className={`${panelClass} p-5 sm:p-6`} onSubmit={translateText}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
              <Clipboard className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                English Input
              </h2>
              <p className="mt-1 text-sm text-[#6e6e73]">
                整个输入框都会被处理，包括超过 1000 字的长文本。
              </p>
            </div>
          </div>

          <textarea
            className="mt-6 min-h-[420px] resize-y rounded-lg border border-[#e5e5ea] bg-white px-4 py-4 text-sm leading-6 text-[#1d1d1f] outline-none transition placeholder:text-[#c7c7cc] focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10"
            value={sourceText}
            onChange={(event) => setSourceText(event.target.value)}
            placeholder="Paste full English text here..."
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Translate Full Text
            </button>
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
              onClick={() => setSourceText(sampleText)}
            >
              <Languages className="h-4 w-4" aria-hidden="true" />
              Use Sample
            </button>
          </div>
        </form>

        <section className={`${panelClass} p-5 sm:p-6`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f5f7] text-[#51247a]">
                <Languages className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-2xl font-semibold tracking-normal text-[#1d1d1f]">
                  中文翻译
                </h2>
                <p className="mt-1 text-sm text-[#6e6e73]">保留原文段落、列表和表格结构。</p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-3 text-sm font-semibold text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
              onClick={copyTranslation}
              disabled={!translation}
            >
              {copyState === "copied" ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Clipboard className="h-4 w-4" aria-hidden="true" />
              )}
              {copyState === "copied" ? "Copied" : "Copy Translation"}
            </button>
          </div>

          <pre
            className={`${softPanelClass} mt-6 min-h-[420px] whitespace-pre-wrap break-words p-4 text-sm leading-7 text-[#1d1d1f]`}
          >
            {translation || "翻译结果会显示在这里。"}
          </pre>
        </section>
      </div>
    </div>
  );
}
