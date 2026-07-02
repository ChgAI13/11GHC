"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "@/messages/en";
import { zh } from "@/messages/zh";

const LanguageContext = createContext(null);
const LANGUAGE_STORAGE_KEY = "gradplan:language:v1";
const messages = { en, zh };

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return savedLanguage === "zh" || savedLanguage === "en" ? savedLanguage : "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  function changeLanguage(nextLanguage) {
    if (nextLanguage !== "zh" && nextLanguage !== "en") {
      return;
    }

    setLanguage(nextLanguage);
  }

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      messages: messages[language],
      setLanguage: changeLanguage,
      toggleLanguage: () => changeLanguage(language === "en" ? "zh" : "en"),
      isChinese: language === "zh"
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
