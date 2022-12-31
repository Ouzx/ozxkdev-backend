import { useState } from "react";
import { AuthLoginResponse } from "../redux/types";

// TODO: Make it generic
export const useLocalStorage = (keyName: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as AuthLoginResponse;
      } else {
        // window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        // return defaultValue;
        return null;
      }
    } catch (err) {
      // return defaultValue;
      return null;
    }
  });
  const setValue = (newValue: AuthLoginResponse | null) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue] as const;
};
