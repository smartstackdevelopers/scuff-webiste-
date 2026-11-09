export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
}

/** Widely spoken / famous world languages */
export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl", flag: "🇵🇰" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇸🇦" },
  { code: "zh", name: "Chinese", nativeName: "中文", dir: "ltr", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr", flag: "🇵🇹" },
  { code: "ru", name: "Russian", nativeName: "Русский", dir: "ltr", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", nativeName: "日本語", dir: "ltr", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", dir: "ltr", flag: "🇰🇷" },
  { code: "it", name: "Italian", nativeName: "Italiano", dir: "ltr", flag: "🇮🇹" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", dir: "ltr", flag: "🇹🇷" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", dir: "ltr", flag: "🇧🇩" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", dir: "ltr", flag: "🇮🇩" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", dir: "ltr", flag: "🇳🇱" },
  { code: "pl", name: "Polish", nativeName: "Polski", dir: "ltr", flag: "🇵🇱" },
];

export type Language = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_STORAGE_KEY = "you_scuff_we_buff_lang";

export function getLanguageMeta(code: string): LanguageOption {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export function isValidLanguage(code: string): code is Language {
  return LANGUAGES.some((l) => l.code === code);
}
