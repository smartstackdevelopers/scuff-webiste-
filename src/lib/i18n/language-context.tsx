"use client";

import * as React from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LANGUAGES,
  getLanguageMeta,
  isValidLanguage,
  type Language,
} from "./languages";
import {
  dictionaries,
  translate,
  type TranslationKey,
} from "./dictionaries";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey | string | undefined, fallback?: string) => string;
  dict: (typeof dictionaries)["en"];
  dir: "ltr" | "rtl";
  isRtl: boolean;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
);

function applyDocumentLanguage(lang: Language) {
  const meta = getLanguageMeta(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = meta.dir;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] =
    React.useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && isValidLanguage(stored)) {
        setLanguageState(stored);
        applyDocumentLanguage(stored);
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const setLanguage = React.useCallback((lang: Language) => {
    if (!isValidLanguage(lang)) return;
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      applyDocumentLanguage(lang);
    } catch {
      // ignore
    }
  }, []);

  const t = React.useCallback(
    (key: TranslationKey | string | undefined, fallback?: string) =>
      translate(language, key, fallback),
    [language]
  );

  const meta = getLanguageMeta(language);
  const value = React.useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
      t,
      dict: dictionaries[language] ?? dictionaries.en,
      dir: meta.dir,
      isRtl: meta.dir === "rtl",
    }),
    [language, setLanguage, t, meta.dir]
  );

  return (
    <LanguageContext.Provider value={value}>
      <div
        dir={mounted ? meta.dir : "ltr"}
        lang={language}
        className={mounted && meta.dir === "rtl" ? "font-urdu-support" : undefined}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    return {
      language: DEFAULT_LANGUAGE as Language,
      setLanguage: (_lang: Language) => {},
      t: (key: TranslationKey | string | undefined, fallback?: string) =>
        translate(DEFAULT_LANGUAGE, key, fallback),
      dict: dictionaries.en,
      dir: "ltr" as const,
      isRtl: false,
    };
  }
  return context;
}

export { LANGUAGES, type Language, type TranslationKey };
