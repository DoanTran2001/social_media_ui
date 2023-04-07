import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ALL_VI from "../locales/vi/vi.json";
import ALL_EN from "../locales/en/en.json";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
} as const;

const resources = {
  en: {
    all: ALL_EN,
  },
  vi: {
    all: ALL_VI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["all"],
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});
