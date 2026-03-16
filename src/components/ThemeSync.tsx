"use client";

import { useEffect } from "react";
import { useTheme } from "@mui/material";

const THEME_KEY = "admin-dashboard-theme";

export function ThemeSync() {
  const theme = useTheme();
  // Keep <html> class and background in sync with MUI mode; persist to localStorage and cookie for SSR
  useEffect(() => {
    const isDark = theme.palette.mode === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.backgroundColor = isDark ? "#141b2d" : "#fcfcfc";
    localStorage.setItem(THEME_KEY, theme.palette.mode);
    document.cookie = `${THEME_KEY}=${theme.palette.mode};path=/;max-age=31536000`;
  }, [theme.palette.mode]);
  return null;
}
