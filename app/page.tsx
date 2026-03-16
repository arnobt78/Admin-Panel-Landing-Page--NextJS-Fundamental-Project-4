/**
 * Home route (/) – renders the main dashboard (stats, charts, recent transactions).
 * Next.js App Router: this file defines the page at the root URL.
 */
import Dashboard from "@/scenes/dashboard";

export default function Home() {
  return <Dashboard />;
}
