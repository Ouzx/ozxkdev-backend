import { useState } from "react";

export const useLocalStorage = (keyName: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) return JSON.parse(value);
      else return null;
    } catch (err) {
      return null;
    }
  });
  const setValue = (newValue: any | null) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue] as const;
};
