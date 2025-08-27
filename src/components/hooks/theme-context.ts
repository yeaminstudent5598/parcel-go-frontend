// src/contexts/theme-context.ts
import { createContext } from "react";
import type { ThemeProviderState } from "@/types/theme";

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => {},
});
