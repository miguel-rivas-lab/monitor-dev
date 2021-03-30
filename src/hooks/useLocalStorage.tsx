import { useEffect, useState } from "react";

function isFunction<T>(data: any): data is () => T {
  return typeof data === "function";
}

export const useLocalStorage = <T,>(
  key: string,
  init?: T | (() => T)
): [T, (data: T) => void] => {
  const state = useState(() => {
    const storageStringData = localStorage.getItem(key);

    if (!storageStringData) {
      const initData = isFunction(init) ? init() : init;
      localStorage.setItem(key, JSON.stringify({ payload: initData }));
      return initData;
    }

    const fetchedData = JSON.parse(storageStringData);
    return fetchedData.payload;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ payload: state }));
  }, [key, state]);

  return state;
};
