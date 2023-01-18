export const isObject = (o: any) => {
  return Object.prototype.toString.call(o) === "[object Object]";
};

export const isArray = (o: any) => {
  return Object.prototype.toString.call(o) === "[object Array]";
};
