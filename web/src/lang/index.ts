import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import cookie from "js-cookie";
import { LANG_NAME } from "@/utils/config";
import zh from "./zh";
import en from "./en";
export default function () {
  let lng = cookie.get(LANG_NAME);
  if (!lng || !["zh", "en"].includes(lng)) {
    lng = "zh";
    cookie.set(LANG_NAME, lng);
  }
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          translation: en
        },
        zh: {
          translation: zh
        }
      },
      lng: lng,
      fallbackLng: lng,

      interpolation: {
        escapeValue: false
      }
    });
}
