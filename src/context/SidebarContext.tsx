"use client";

/**
 * Sidebar collapse state shared across the app.
 * Used by Sidebar and layout to keep expand/collapse in sync.
 */
import { createContext, useState } from "react";
import type { SidebarContextValue } from "@/types";

// Default for consumers outside provider (e.g. in tests)
export const SidebarContext = createContext<SidebarContextValue>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

/** Provides sidebar collapsed state to Sidebar and Topbar (collapse/expand toggle). */
export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}
