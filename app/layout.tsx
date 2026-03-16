import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full w-full font-sans antialiased`} suppressHydrationWarning>
      <body className="h-full w-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
