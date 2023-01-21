export const isObject = (o: any) => {
  return Object.prototype.toString.call(o) === "[object Object]";
};

export const isArray = (o: any) => {
  return Object.prototype.toString.call(o) === "[object Array]";
};

//判断是否是有效的颜色值
export const testColor = (color: string) => {
  const re1 = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
  const re2 =
    /^rgb\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\)$/i;
  const re3 =
    /^rgba\(([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,([0-9]|[0-9][0-9]|25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9])\,(1|1.0|0.[0-9])\)$/i;
  return re2.test(color) || re1.test(color) || re3.test(color);
};
