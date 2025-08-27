// src/types/theme.ts
export type ThemeProviderState = {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
};
