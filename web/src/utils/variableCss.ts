import { isObject } from "@/utils";
export default function (token: object) {
  if (!isObject(token)) return;
  let themeRule = `:root{`;
  for (const key in token) {
    let val = token[key];
    if (val >= 0) val = val + "px";
    themeRule += `--${key}:${val};`;
  }
  themeRule += "}";
  const cssRules = document.styleSheets[0].cssRules;
  const index = cssRules.length - 1 < 0 ? 0 : cssRules.length;
  // if (cssRules[index].includes("--colorPrimary")) {
  //   document.styleSheets[0].deleteRule(index);
  // }
  document.styleSheets[0].insertRule(themeRule, index);
}
