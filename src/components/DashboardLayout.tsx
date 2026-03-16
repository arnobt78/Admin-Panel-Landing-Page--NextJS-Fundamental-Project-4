"use client";

import { Sidebar } from "@/scenes/global/Sidebar";
import { Topbar } from "@/scenes/global/Topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <main className="flex min-h-0 flex-1 flex-col">
        <Topbar />
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
