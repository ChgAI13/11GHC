"use client";

import { useState } from "react";
import { Bug, Lightbulb, MessageCircle, MessageSquareText, Send, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { CONTACT_EMAIL } from "@/lib/siteMeta";

const feedbackTypes = [
  { key: "bug", icon: Bug },
  { key: "feature", icon: Lightbulb },
  { key: "general", icon: MessageSquareText }
];

function buildMailtoHref({ typeLabel, message, email, page, t }) {
  const subject = t.mailtoSubject(typeLabel);
  const body = t.mailtoBody({
    type: typeLabel,
    message,
    email,
    page
  });

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function FeedbackWidget() {
  const { messages } = useLanguage();
  const t = messages.feedback;
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedTypeLabel = t.typeOptions[feedbackType];
  function openDialog() {
    setIsOpen(true);
    setError("");
  }

  function closeDialog() {
    setIsOpen(false);
    setError("");
  }

  function submitFeedback(event) {
    event.preventDefault();

    if (!message.trim()) {
      setError(t.validation);
      return;
    }

    const mailtoHref = buildMailtoHref({
      typeLabel: selectedTypeLabel,
      message: message.trim(),
      email: email.trim(),
      page: typeof window === "undefined" ? "" : window.location.href,
      t
    });

    setSubmitted(true);
    setError("");
    window.location.href = mailtoHref;
  }

  return (
    <>
      <button
        type="button"
        className="fixed bottom-24 right-4 z-40 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#e5e5ea] bg-white/95 px-4 text-sm font-semibold text-[#1d1d1f] shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#f5f5f7] dark:border-[#3a3a3c] dark:bg-[#1c1c1e]/95 dark:text-white dark:hover:bg-[#2c2c2e] lg:bottom-6"
        onClick={openDialog}
      >
        <MessageCircle className="h-4 w-4 text-[#51247a] dark:text-[#d8b4fe]" aria-hidden="true" />
        {t.floatingButton}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/30 p-3 backdrop-blur-sm sm:place-items-center sm:p-6">
          <section
            className="w-full max-w-lg rounded-lg border border-[#e5e5ea] bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.20)] dark:border-[#3a3a3c] dark:bg-[#1c1c1e] sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#51247a] dark:text-[#d8b4fe]">
                  GradPlan
                </p>
                <h2
                  id="feedback-title"
                  className="mt-2 text-2xl font-semibold tracking-normal text-[#1d1d1f] dark:text-white"
                >
                  {t.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#6e6e73] dark:text-[#c7c7cc]">
                  {t.intro}
                </p>
              </div>
              <button
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#e5e5ea] bg-white text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f] dark:border-[#3a3a3c] dark:bg-[#111113] dark:text-[#c7c7cc] dark:hover:bg-[#2c2c2e] dark:hover:text-white"
                onClick={closeDialog}
                aria-label={t.close}
                title={t.close}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {submitted ? (
              <div className="mt-5 rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-4 text-sm font-semibold leading-6 text-[#166534]">
                {t.success}
              </div>
            ) : null}

            <form className="mt-5 grid gap-5" onSubmit={submitFeedback}>
              <fieldset>
                <legend className="text-sm font-medium text-[#6e6e73] dark:text-[#c7c7cc]">
                  {t.typeLabel}
                </legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {feedbackTypes.map((item) => {
                    const Icon = item.icon;
                    const active = feedbackType === item.key;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        className={`min-h-12 rounded-lg border px-3 text-left text-sm font-semibold transition ${
                          active
                            ? "border-[#51247a] bg-[#fbf8ff] text-[#51247a] dark:border-[#d8b4fe] dark:bg-[#2c1f36] dark:text-[#d8b4fe]"
                            : "border-[#e5e5ea] bg-white text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f] dark:border-[#3a3a3c] dark:bg-[#111113] dark:text-[#c7c7cc] dark:hover:bg-[#2c2c2e] dark:hover:text-white"
                        }`}
                        onClick={() => setFeedbackType(item.key)}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {t.typeOptions[item.key]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="block">
                <span className="text-sm font-medium text-[#6e6e73] dark:text-[#c7c7cc]">
                  {t.messageLabel}
                </span>
                <textarea
                  className="mt-2 min-h-32 w-full resize-y rounded-lg border border-[#e5e5ea] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#1d1d1f] outline-none transition placeholder:text-[#a1a1a6] focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10 dark:border-[#3a3a3c] dark:bg-[#111113] dark:text-white"
                  placeholder={t.messagePlaceholder}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setError("");
                  }}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[#6e6e73] dark:text-[#c7c7cc]">
                  {t.emailLabel}
                </span>
                <input
                  className="mt-2 h-12 w-full rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-medium text-[#1d1d1f] outline-none transition placeholder:text-[#a1a1a6] focus:border-[#51247a] focus:ring-4 focus:ring-[#51247a]/10 dark:border-[#3a3a3c] dark:bg-[#111113] dark:text-white"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              {error ? (
                <p className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-3 text-sm font-medium text-[#9a3412]">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {t.submit}
              </button>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
