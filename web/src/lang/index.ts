import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import cookie from "js-cookie";
import { LANG_NAME } from "@/utils/config";

const fileLangs = require.context("./config", false, /.ts$/);
const resources = {};
for (let index = 0; index < fileLangs.keys().length; index++) {
  const key = fileLangs.keys()[index];
  const ketName = key.match(/.\/(\S*).ts/)?.[1];
  if (!ketName) continue;
  resources[ketName] = { translation: fileLangs(key).default };
}

export const i18nResArr = Object.keys(resources);


export default function () {
  let lng = cookie.get(LANG_NAME);
  if (!lng || !i18nResArr.includes(lng)) {
    lng = "zh";
    cookie.set(LANG_NAME, lng);
  }
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      // resources: {
      //   en: {
      //     translation: en
      //   },
      //   zh: {
      //     translation: zh
      //   }
      // },
      lng: lng,
      fallbackLng: lng,

      interpolation: {
        escapeValue: false
      }
    });
}

