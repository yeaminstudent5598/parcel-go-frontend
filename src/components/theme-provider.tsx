// src/components/theme-provider.tsx
import { useState, useEffect, type ReactNode } from "react";
import { ThemeProviderContext } from "./hooks/theme-context";


export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">(() => {
    const saved = localStorage.getItem(storageKey) as
      | "light"
      | "dark"
      | "system"
      | null;
    return saved ?? defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const appliedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.add(appliedTheme);
  }, [theme]);

  const setTheme = (newTheme: "light" | "dark" | "system") => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
