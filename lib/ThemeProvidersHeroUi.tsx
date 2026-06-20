// app/providers.tsx
"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";

export function ThemeProvidersHeroUi({children}: {children: React.ReactNode}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={["light", "dark", "ocean", "ocean-dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}