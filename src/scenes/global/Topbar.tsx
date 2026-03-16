"use client";

/**
 * Top bar: search input, theme toggle (ColorModeContext), notifications/settings/profile buttons.
 * Theme-aware styles; no navigation (sidebar handles routes).
 */
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "@/lib/theme";
import { Search, Sun, Moon, Bell, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Topbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isDark = theme.palette.mode === "dark";

  return (
    <header className={cn("flex h-14 shrink-0 items-center justify-between bg-token-primary-400 px-4", isDark && "border-b border-token-primary-600")}>
      <div className="flex flex-1 items-center gap-2 max-w-md">
        <div className="relative flex flex-1">
          <Search className={cn("absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2", isDark ? "text-token-grey-500" : "text-gray-500")} />
          <input
            type="search"
            placeholder="Search..."
            className={cn(
              "w-full rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-token-blueAccent-500",
              isDark
                ? "border border-token-primary-600 bg-token-primary-500 text-token-grey-100 placeholder:text-token-grey-500 focus:border-token-blueAccent-500"
                : "border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-token-blueAccent-500"
            )}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* Toggle light/dark; icon shows Sun in dark mode (click to go light), Moon in light mode */}
        <button
          type="button"
          onClick={colorMode.toggleColorMode}
          className={cn("rounded-lg p-2 transition-colors", isDark ? "text-token-grey-100 hover:bg-token-primary-600" : "text-gray-700 hover:bg-gray-200")}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          type="button"
          className={cn("rounded-lg p-2 transition-colors", isDark ? "text-token-grey-100 hover:bg-token-primary-600" : "text-gray-700 hover:bg-gray-200")}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={cn("rounded-lg p-2 transition-colors", isDark ? "text-token-grey-100 hover:bg-token-primary-600" : "text-gray-700 hover:bg-gray-200")}
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={cn("rounded-lg p-2 transition-colors", isDark ? "text-token-grey-100 hover:bg-token-primary-600" : "text-gray-700 hover:bg-gray-200")}
          aria-label="Profile"
        >
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
