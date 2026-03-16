import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Panel - React Dashboard",
  description:
    "A modern, fully-featured admin dashboard built with React. Learning project for React fundamentals: components, context, hooks, and more.",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("admin-dashboard-theme")?.value;
  const initialMode = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  const themeScript = `(function(){var d=document.documentElement;var m=localStorage.getItem('admin-dashboard-theme')||'${initialMode}';d.classList.toggle('dark',m==='dark');d.style.backgroundColor=m==='dark'?'#141b2d':'#fcfcfc';})();`;

  return (
    <html lang="en" className={`${plusJakarta.variable} h-full w-full font-sans antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="h-full w-full font-sans" suppressHydrationWarning>
        <Providers initialMode={initialMode}>{children}</Providers>
      </body>
    </html>
  );
}
