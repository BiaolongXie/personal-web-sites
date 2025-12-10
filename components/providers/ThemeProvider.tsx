"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// 如果你用了 typescript，可能需要引入 type，但通常这样就够了
// import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: any) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}