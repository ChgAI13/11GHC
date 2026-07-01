"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Languages, Sparkles } from "lucide-react";

const sampleEmail =
  "Dear student,\n\nYour assignment extension request has been approved. Please submit your revised report by Friday, 18 August at 5:00 PM through the online portal. If you need further assistance, contact Student Services before the deadline.\n\nKind regards,\nCourse Coordinator";

function createMockExplanation(email) {
  const hasDeadline = /deadline|due|submit|by|before/i.test(email);
  const dateMatches =
    email.match(
      /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+\d{1,2}\s+[A-Za-z]+(?:\s+\d{4})?(?:\s+at\s+\d{1,2}:\d{2}\s*(?:AM|PM)?)?|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/gi
    ) || [];
  const contactMatch = email.match(/contact\s+([A-Za-z\s]+?)(?:\.|,| before| by|\n)/i);

  return {
    summary:
      "这封邮件是在通知你一件和课程或学校服务有关的事项。重点是确认当前状态、截止时间，以及你下一步需要完成的动作。",
    dates: dateMatches.length
      ? dateMatches
      : hasDeadline
        ? ["邮件中提到有截止时间，但没有识别到明确日期，请人工确认原文。"]
        : ["没有识别到明确日期。"],
    actions: [
      hasDeadline ? "确认截止时间，并在日历里设置提醒。" : "确认邮件是否需要你回复或提交材料。",
      "检查邮件里的链接、portal、附件或表格要求。",
      contactMatch
        ? `如有问题，联系 ${contactMatch[1].trim()}。`
        : "如果不确定，联系课程协调员或 Student Services。"
    ],
    tone: hasDeadline ? "需要尽快处理" : "普通通知"
  };
}

export default function AiEmailExplainerPage() {
  const [email, setEmail] = useState(sampleEmail);
  const [submittedEmail, setSubmittedEmail] = useState(sampleEmail);

  const result = useMemo(() => createMockExplanation(submittedEmail), [submittedEmail]);

  function explainEmail(event) {
    event.preventDefault();
    setSubmittedEmail(email.trim() || sampleEmail);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
      <section className="surface p-4 sm:p-6">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-ocean">AI Mock</p>
        <h1 className="mt-2 text-3xl font-black tracking-normal text-ink">
          AI Email Explainer
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">
          粘贴英文邮件，先用 mock response 输出中文解释、重要日期和需要做什么。
        </p>

        <form className="mt-6" onSubmit={explainEmail}>
          <label>
            <span className="field-label">英文邮件内容</span>
            <textarea
              className="field-input min-h-[320px] resize-y leading-6"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Paste your university email here..."
            />
          </label>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="primary-button">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              生成中文解释
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setEmail(sampleEmail)}
            >
              <Languages className="h-4 w-4" aria-hidden="true" />
              使用示例邮件
            </button>
          </div>
        </form>
      </section>

      <aside className="grid gap-4 lg:sticky lg:top-24">
        <div className="rounded-lg border border-ocean/20 bg-[#e0f1f7] p-4">
          <div className="flex items-center gap-2 text-sm font-black text-ocean">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Mock Response
          </div>
          <p className="mt-3 text-sm leading-6 text-ink/75">{result.summary}</p>
          <p className="mt-4 inline-flex rounded-lg bg-white px-3 py-2 text-sm font-black text-ocean">
            {result.tone}
          </p>
        </div>

        <div className="rounded-lg border border-ink/10 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <CalendarDays className="h-4 w-4 text-coral" aria-hidden="true" />
            重要日期
          </div>
          <ul className="mt-3 grid gap-2">
            {result.dates.map((date) => (
              <li key={date} className="rounded-lg bg-paper px-3 py-2 text-sm text-ink/75">
                {date}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-ink/10 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <CheckCircle2 className="h-4 w-4 text-eucalyptus" aria-hidden="true" />
            需要做什么
          </div>
          <ul className="mt-3 grid gap-2">
            {result.actions.map((action) => (
              <li
                key={action}
                className="flex gap-2 rounded-lg bg-paper px-3 py-2 text-sm leading-6 text-ink/75"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-eucalyptus" aria-hidden="true" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-ink/10 bg-white p-4 text-sm leading-6 text-ink/65">
          当前没有连接真实 AI API。之后可以把 mock 函数替换成后端 API route，再接入模型服务。
        </div>
      </aside>
    </div>
  );
}
