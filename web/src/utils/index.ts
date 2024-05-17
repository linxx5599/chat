import decode from "@/utils/decode";

export const isObject = (o: any) => {
  return Object.prototype.toString.call(o) === "[object Object]";
};

export const isArray = (o: any) => {
  return Object.prototype.toString.call(o) === "[object Array]";
};

//判断是否是有效的颜色值
export const testColor = (color: any) => {
  const re1 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
  const re2 =
    /^rgb\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\)$/i;
  const re3 =
    /^rgba\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,(1|1.0|0.[0-9])\)$/i;
  return re2.test(color) || re1.test(color) || re3.test(color);
};

export function insertAtCursor(
  myField: HTMLTextAreaElement,
  myValue: string,
  {
    targetVal,
    setTargetVal
  }: {
    targetVal: string;
    setTargetVal: React.Dispatch<React.SetStateAction<string>>;
  }
): { selectionStart?: any; selectionEnd?: any } {
  const text = decode(myValue);
  if (myField.selectionStart || myField.selectionStart == 0) {
    const startPos = myField.selectionStart;
    const endPos = myField.selectionEnd;
    const val =
      targetVal.substring(0, startPos) +
      text +
      targetVal.substring(endPos, targetVal.length);
    setTargetVal(val);
    return {
      selectionStart: startPos + text.length,
      selectionEnd: startPos + text.length
    };
  } else {
    setTargetVal(text);
  }
  return {};
}
export function getUuid(num: number = 36, str: string = ""): string {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < num; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] as any & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  let uuid = s.join("");
  uuid = uuid.split("-").join("");
  return str + uuid;
}
