import { isObject } from "@/utils";
export default function (token: object) {
  if (!isObject(token)) return;
  let themeRule = ``;
  const withs: string[] = ["opacity", "index", "motion"];
  for (const key in token) {
    let val = token[key];
    //z-index
    if (val > 0 && !withs.some((k) => key.toLocaleLowerCase().includes(k))) {
      val = val + "px";
    }
    themeRule += `--${key}:${val};`;
  }
  document.documentElement.style = themeRule;
  // themeRule += "}";
  // const cssRules = document.styleSheets[0].cssRules;
  // const index = cssRules.length - 1 < 0 ? 0 : cssRules.length;
  // if (cssRules[index].includes("--colorPrimary")) {
  //   document.styleSheets[0].deleteRule(index);
  // }

  // document.styleSheets[0].insertRule(themeRule, index);
}
