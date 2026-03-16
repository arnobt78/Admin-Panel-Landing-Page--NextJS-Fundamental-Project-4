"use client";

/**
 * Main sidebar: nav links (Next Link), collapse state from SidebarContext, active route from usePathname.
 * Shows profile block when expanded; Lucide icons; theme-aware (isDark) styling.
 */
import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { SidebarContext } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Contact,
  Receipt,
  User,
  Calendar,
  HelpCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  Map,
  Menu,
  ChevronLeft,
} from "lucide-react";

// Map pathname to label for active state and aria
const pathToTitle: Record<string, string> = {
  "/": "Dashboard",
  "/team": "Manage Team",
  "/contacts": "Contacts Information",
  "/invoices": "Invoices Balances",
  "/form": "Profile Form",
  "/calendar": "Calendar",
  "/faq": "FAQ Page",
  "/bar": "Bar Chart",
  "/pie": "Pie Chart",
  "/line": "Line Chart",
  "/geography": "Geography Chart",
};

const navItems: { title: string; to: string; icon: React.ReactNode }[] = [
  { title: "Dashboard", to: "/", icon: <Home className="h-5 w-5 shrink-0" /> },
  {
    title: "Manage Team",
    to: "/team",
    icon: <Users className="h-5 w-5 shrink-0" />,
  },
  {
    title: "Contacts Information",
    to: "/contacts",
    icon: <Contact className="h-5 w-5 shrink-0" />,
  },
  {
    title: "Invoices Balances",
    to: "/invoices",
    icon: <Receipt className="h-5 w-5 shrink-0" />,
  },
  {
    title: "Profile Form",
    to: "/form",
    icon: <User className="h-5 w-5 shrink-0" />,
  },
  {
    title: "Calendar",
    to: "/calendar",
    icon: <Calendar className="h-5 w-5 shrink-0" />,
  },
  {
    title: "FAQ Page",
    to: "/faq",
    icon: <HelpCircle className="h-5 w-5 shrink-0" />,
  },
  {
    title: "Bar Chart",
    to: "/bar",
    icon: <BarChart3 className="h-5 w-5 shrink-0" />,
  },
  {
    title: "Pie Chart",
    to: "/pie",
    icon: <PieChart className="h-5 w-5 shrink-0" />,
  },
  {
    title: "Line Chart",
    to: "/line",
    icon: <TrendingUp className="h-5 w-5 shrink-0" />,
  },
  {
    title: "Geography Chart",
    to: "/geography",
    icon: <Map className="h-5 w-5 shrink-0" />,
  },
];

export function Sidebar() {
  const theme = useTheme();
  const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);
  const pathname = usePathname();
  const selected = pathToTitle[pathname] ?? "Dashboard";
  const isDark = theme.palette.mode === "dark";

  // Notify Recharts ResponsiveContainer to recalc size when sidebar toggles
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 300);
    return () => clearTimeout(t);
  }, [isCollapsed]);

  return (
    <aside
      className={cn(
        "app-sidebar flex h-full flex-col bg-token-primary-400 transition-[width] duration-300 ease-in-out",
        isDark && "border-r border-token-primary-600",
        isCollapsed ? "w-[80px]" : "w-[270px]",
      )}
      aria-label="Main navigation"
    >
      <div
        className={cn(
          "flex h-14 shrink-0 items-center justify-between px-3",
          isDark && "border-b border-token-primary-600",
        )}
      >
        {!isCollapsed && (
          <span
            className={cn(
              "text-lg font-semibold tracking-tight",
              isDark ? "text-token-grey-100" : "text-gray-800",
            )}
          >
            ADMIN PANEL
          </span>
        )}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "rounded-md p-2 transition-colors",
            isDark
              ? "text-token-grey-100 hover:bg-token-primary-600 hover:text-token-greenAccent-400"
              : "text-gray-700 hover:bg-gray-300",
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div
          className={cn(
            "flex flex-col items-center py-2",
            isDark && "border-b border-token-primary-600",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Profile"
            width={100}
            height={100}
            src="/assets/user.png"
            className="rounded-full object-cover"
          />
          <p
            className={cn(
              "mt-2 text-center text-lg font-semibold",
              isDark ? "text-token-grey-100" : "text-gray-800",
            )}
          >
            John Doe
          </p>
          <p className="text-sm text-token-greenAccent-500">
            System Administrator
          </p>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = selected === item.title;
            return (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ease-out",
                    isActive
                      ? "bg-token-blueAccent-700 text-white"
                      : isDark
                        ? "text-token-grey-200 hover:bg-token-primary-600 hover:text-token-grey-100"
                        : "text-token-grey-200 hover:bg-gray-400 hover:text-white",
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
