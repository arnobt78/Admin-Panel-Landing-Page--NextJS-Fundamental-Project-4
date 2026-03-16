/**
 * Root layout – wraps every page. Sets font, SEO metadata, and theme hydration.
 * Runs on the server; reads theme from cookie for initial paint to avoid flash.
 */
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

// Next.js font: exposes CSS variable --font-sans for Tailwind (font-sans)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://management-admin-panel.vercel.app";

// SEO: title, description, Open Graph, Twitter, robots; used by search engines and social shares
export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard - Next.js, React, TypeScript, TailwindCSS Fundamental Project 4 (including charts, team/contacts/invoices, form, calendar, FAQ, theme)",
    template: "%s | Admin Dashboard",
  },
  description:
    "A modern, fully-featured admin dashboard built with React, Next.js, and TypeScript. Features responsive sidebar, charts (Recharts), data grids, calendar, forms, light/dark theme, and team/contacts/invoices management. By Arnob Mahmud (https://www.arnobmahmud.com, contact@arnobmahmud.com).",
  keywords: [
    "React",
    "Admin Dashboard",
    "Next.js",
    "TypeScript",
    "Material-UI",
    "Recharts",
    "DataGrid",
    "Sidebar",
    "Theming",
    "Charts",
    "Responsive",
    "FullCalendar",
    "Data Visualization",
    "Business Management",
    "TailwindCSS",
  ],
  authors: [
    { name: "Arnob Mahmud", url: "https://www.arnobmahmud.com" },
  ],
  creator: "Arnob Mahmud",
  publisher: "Arnob Mahmud",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Admin Dashboard - Next.js, React, TypeScript, TailwindCSS Fundamental Project 4 (including charts, team/contacts/invoices, form, calendar, FAQ, theme)",
    title: "Admin Dashboard - Next.js, React, TypeScript, TailwindCSS Fundamental Project 4 (including charts, team/contacts/invoices, form, calendar, FAQ, theme)",
    description:
      "A modern, fully-featured admin dashboard with charts, data grids, calendar, and light/dark theme. By Arnob Mahmud.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Dashboard - Next.js, React, TypeScript, TailwindCSS Fundamental Project 4 (including charts, team/contacts/invoices, form, calendar, FAQ, theme)",
    description: "Modern admin dashboard built with React, Next.js, TypeScript. By Arnob Mahmud.",
  },
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server: read theme from cookie so first paint matches user preference (avoids light flash in dark mode)
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("admin-dashboard-theme")?.value;
  const initialMode = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  // Inline script runs before React: sets .dark on <html> and background from localStorage or system preference
  const themeScript = `(function(){var d=document.documentElement;var m=localStorage.getItem('admin-dashboard-theme');if(!m){var q=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;m=q?'dark':'light';}if(!m)m='${initialMode}';d.classList.toggle('dark',m==='dark');d.style.backgroundColor=m==='dark'?'#141b2d':'#fcfcfc';})();`;

  return (
    <html lang="en" className={`${plusJakarta.variable} h-full w-full font-sans antialiased`} suppressHydrationWarning>
      <head>
        {/* Prevents theme flash: apply theme class/background before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="h-full w-full font-sans" suppressHydrationWarning>
        {/* Providers: MUI theme + sidebar context + layout (Sidebar + Topbar + main). initialMode from server cookie. */}
        <Providers initialMode={initialMode}>{children}</Providers>
      </body>
    </html>
  );
}
