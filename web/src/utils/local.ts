import { isObject, isArray } from "@/utils";

export const setLocal = (key: string, val: any) => {
  if (isObject(val) || isArray(val)) {
    val = JSON.stringify(val);
  }
  window.localStorage.setItem(key, val);
};

export const getLocal = (key: string) => {
  let val: any = window.localStorage.getItem(key);
  try {
    val = JSON.parse(val);
  } catch {}
  return window.localStorage.getItem(key);
};

export const removeLocal = (key: string) => {
  return window.localStorage.removeItem(key);
};

export const clearLocal = () => {
  return window.localStorage.clear();
};

export const setSession = (key: string, val: any) => {
  if (isObject(val) || isArray(val)) {
    val = JSON.stringify(val);
  }
  window.sessionStorage.setItem(key, val);
};

export const getSession = (key: string) => {
  let val: any = window.sessionStorage.getItem(key);
  try {
    val = JSON.parse(val);
  } catch {}
  return window.sessionStorage.getItem(key);
};

export const removeSession = (key: string) => {
  return window.sessionStorage.removeItem(key);
};

export const clearSession = () => {
  return window.sessionStorage.clear();
};
