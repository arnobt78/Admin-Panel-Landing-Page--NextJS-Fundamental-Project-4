"use client";

/**
 * Dashboard shell: sidebar + topbar + main content area.
 * Renders the active page (children) inside the main content.
 * Defers layout content until after mount to avoid hydration mismatch with MUI/Emotion style injection.
 */
import { useState, useEffect } from "react";
import { Sidebar } from "@/scenes/global/Sidebar";
import { Topbar } from "@/scenes/global/Topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex relative" aria-hidden="true">
        <div className="h-full w-full flex-1" />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex relative">
      <Sidebar />
      <main className="h-full w-full">
        <Topbar />
        {children}
      </main>
    </div>
  );
}
