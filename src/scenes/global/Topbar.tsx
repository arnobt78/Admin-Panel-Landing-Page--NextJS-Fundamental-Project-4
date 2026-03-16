"use client";

import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "@/lib/theme";
import { Search, Sun, Moon, Bell, Settings, User } from "lucide-react";

export function Topbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isDark = theme.palette.mode === "dark";

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-token-primary-600 bg-token-primary-400 px-4">
      <div className="flex flex-1 items-center gap-2 max-w-md">
        <div className="relative flex flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-token-grey-500" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg border border-token-primary-600 bg-token-primary-500 py-2 pl-9 pr-3 text-sm text-token-grey-100 placeholder:text-token-grey-500 focus:border-token-blueAccent-500 focus:outline-none focus:ring-1 focus:ring-token-blueAccent-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={colorMode.toggleColorMode}
          className="rounded-lg p-2 text-token-grey-100 transition-colors hover:bg-token-primary-600"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-token-grey-100 transition-colors hover:bg-token-primary-600"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-token-grey-100 transition-colors hover:bg-token-primary-600"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-token-grey-100 transition-colors hover:bg-token-primary-600"
          aria-label="Profile"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
