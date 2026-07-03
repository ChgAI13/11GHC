"use client";

import { useState } from "react";
import { Bug, Clipboard, Lightbulb, MessageCircle, MessageSquareText, Send, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const FEEDBACK_RECIPIENT_EMAIL = "3243391301@qq.com";

const feedbackTypes = [
  { key: "bug", icon: Bug },
  { key: "feature", icon: Lightbulb },
  { key: "general", icon: MessageSquareText }
];

function createFeedbackPayload({ typeLabel, message, email }) {
  return {
    type: typeLabel,
    message,
    email,
    page: typeof window === "undefined" ? "" : window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator === "undefined" ? "" : navigator.userAgent
  };
}

function buildFeedbackSubject(type) {
  return `GradPlan Feedback - ${type}`;
}

function buildFeedbackBody(payload) {
  return [
    `Type: ${payload.type}`,
    "",
    "Message:",
    payload.message,
    "",
    `User Email: ${payload.email || "Not provided"}`,
    `Current Page URL: ${payload.page}`,
    `Timestamp: ${payload.timestamp}`,
    `Browser User Agent: ${payload.userAgent}`
  ].join("\n");
}

function buildFeedbackCopyText(payload) {
  return [
    `To: ${FEEDBACK_RECIPIENT_EMAIL}`,
    `Subject: ${buildFeedbackSubject(payload.type)}`,
    "",
    buildFeedbackBody(payload)
  ].join("\n");
}

function buildMailtoHref(payload) {
  const subject = buildFeedbackSubject(payload.type);
  const body = buildFeedbackBody(payload);

  return `mailto:${FEEDBACK_RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
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
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const selectedTypeLabel = t.typeOptions[feedbackType];
  function openDialog() {
    setIsOpen(true);
    setError("");
    setCopyStatus("");
  }

  function closeDialog() {
    setIsOpen(false);
    setError("");
    setCopyStatus("");
    setFallbackVisible(false);
  }

  function buildCurrentFeedbackPayload() {
    return createFeedbackPayload({
      typeLabel: selectedTypeLabel,
      message: message.trim(),
      email: email.trim()
    });
  }

  async function copyFeedback() {
    if (!message.trim()) {
      setError(t.validation);
      return;
    }

    try {
      await copyTextToClipboard(buildFeedbackCopyText(buildCurrentFeedbackPayload()));
      setError("");
      setCopyStatus(t.copySuccess);
    } catch {
      setCopyStatus("");
      setError(t.copyError);
    }
  }

  function submitFeedback(event) {
    event.preventDefault();

    if (!message.trim()) {
      setError(t.validation);
      return;
    }

    const feedbackPayload = buildCurrentFeedbackPayload();
    const mailtoHref = buildMailtoHref(feedbackPayload);
    let didLeavePage = false;
    const markDidLeavePage = () => {
      didLeavePage = true;
    };

    window.addEventListener("blur", markDidLeavePage, { once: true });
    document.addEventListener("visibilitychange", markDidLeavePage, { once: true });

    setSubmitted(true);
    setFallbackVisible(false);
    setCopyStatus("");
    setError("");
    window.location.href = mailtoHref;

    window.setTimeout(() => {
      window.removeEventListener("blur", markDidLeavePage);
      document.removeEventListener("visibilitychange", markDidLeavePage);

      if (!didLeavePage && document.visibilityState === "visible") {
        setFallbackVisible(true);
      }
    }, 1500);
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
                {t.draftOpened}
              </div>
            ) : null}

            {fallbackVisible ? (
              <div className="mt-3 rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm font-semibold leading-6 text-[#9a3412]">
                {t.emailAppFallback(FEEDBACK_RECIPIENT_EMAIL)}
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
                    setCopyStatus("");
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
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setCopyStatus("");
                  }}
                />
              </label>

              {error ? (
                <p className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-3 text-sm font-medium text-[#9a3412]">
                  {error}
                </p>
              ) : null}

              {copyStatus ? (
                <p className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-3 text-sm font-medium text-[#166534]">
                  {copyStatus}
                </p>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#e5e5ea] bg-white px-4 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#f5f5f7] dark:border-[#3a3a3c] dark:bg-[#111113] dark:text-white dark:hover:bg-[#2c2c2e]"
                  onClick={copyFeedback}
                >
                  <Clipboard className="h-4 w-4" aria-hidden="true" />
                  {t.copyFeedback}
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#51247a] px-4 text-sm font-semibold text-white transition hover:bg-[#3f1c62]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {t.submit}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
