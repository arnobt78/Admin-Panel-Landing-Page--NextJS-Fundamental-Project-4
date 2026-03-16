"use client";

/**
 * Root providers: theme (color mode) and sidebar state.
 * Wraps the app so all pages share the same theme and sidebar context.
 */
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/lib/theme";
import { SidebarProvider } from "@/context/SidebarContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ThemeSync } from "@/components/ThemeSync";

export function Providers({ children, initialMode }: { children: React.ReactNode; initialMode?: "light" | "dark" }) {
  // useMode: MUI theme + toggleColorMode; initialMode from server cookie for first paint
  const [theme, colorMode] = useMode(initialMode);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ThemeSync />
        <CssBaseline />
        {/* Sidebar + Topbar wrap all page content; sidebar collapse state lives here */}
        <SidebarProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </SidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
