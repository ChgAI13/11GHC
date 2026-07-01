"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { load, save } from "@/lib/storage";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("zh");

  useEffect(() => {
    const savedLanguage = load("language", "zh");

    if (savedLanguage === "zh" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    save("language", nextLanguage);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage: changeLanguage,
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
