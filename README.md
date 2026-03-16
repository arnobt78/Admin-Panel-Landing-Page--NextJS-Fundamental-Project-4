# Admin Dashboard - Next.js, React, TypeScript, TailwindCSS Fundamental Project 4 (including analytics, management, charts, team/contacts/invoices, form, calendar, FAQ, theme)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![Material-UI](https://img.shields.io/badge/MUI-5.15-007fff)](https://mui.com/)

A modern, fully-featured, and customizable admin dashboard built with React, Next.js, TypeScript, Material-UI, Recharts, and Tailwind CSS. This project is designed for learning, rapid prototyping, and real-world admin panel use cases. It demonstrates responsive layout, theme switching (light/dark), data grids, charts, forms, calendar, and reusable component patterns.

- **Live Demo:** [https://management-admin-panel.vercel.app/](https://management-admin-panel.vercel.app/)

![Image](https://github.com/user-attachments/assets/1d0075b9-a716-4d73-a878-566e5dd08ae6)
![Image](https://github.com/user-attachments/assets/75f2a7cf-e3f6-40a8-b0d6-9698a6c08e5c)
![Image](https://github.com/user-attachments/assets/48f699f9-2f5f-4b5b-a888-302f7d7267d9)
![Image](https://github.com/user-attachments/assets/af6e364c-4421-46ec-918a-e68e4d4aff39)
![Image](https://github.com/user-attachments/assets/ae2f0d33-a572-48a4-b045-53276650e116)
![Image](https://github.com/user-attachments/assets/54e9e49d-0c3a-4e4e-844d-65c4ec5de522)
![Image](https://github.com/user-attachments/assets/aadcb495-b966-4202-9388-505b519497bb)
![Image](https://github.com/user-attachments/assets/ea4dfadd-076e-4eda-bac9-3deff5708834)
![Image](https://github.com/user-attachments/assets/ea901b3e-73b9-48cf-a7ef-11117229d8c0)
![Image](https://github.com/user-attachments/assets/e1934084-7621-42a7-9e7f-2fb166fb73e1)
![Image](https://github.com/user-attachments/assets/9fb08fd0-de33-4ef2-891f-4187d9f46b3b)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routes & Pages](#routes--pages)
- [Components Walkthrough](#components-walkthrough)
- [Data & Backend](#data--backend)
- [Theming & Customization](#theming--customization)
- [Reusing Components](#reusing-components)
- [Libraries & Dependencies](#libraries--dependencies)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [License](#license)
- [Happy Coding!](#happy-coding-)

---

## Project Overview

This admin dashboard is a **front-end only** application built with the Next.js 16 App Router. It provides a complete UI for business management: dashboard with KPIs and charts, team/contacts/invoices data grids, a profile form with validation, an interactive calendar, FAQ accordion, and multiple chart types (Bar, Line, Pie, Geography). The app uses **mock data** from `src/data/mockData.ts`—there is no backend or API. All state is managed with React (context for theme and sidebar). The project is ideal for learning React patterns, Next.js App Router, TypeScript, and UI composition.

---

## Features

| Feature                | Description                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Responsive Sidebar** | Collapsible navigation with Lucide icons; active route highlighting.                                                                            |
| **Dashboard**          | Summary stat cards (StatBox), Revenue line chart, Campaign progress circle, Sales bar chart, Geography traffic chart, Recent transactions list. |
| **Data Grids**         | Team, Contacts, and Invoices pages use MUI DataGrid with sorting, filtering, and theme-aware styling.                                           |
| **Profile Form**       | Create-user form with Formik and Yup validation.                                                                                                |
| **Calendar**           | FullCalendar with day/week/month/list views; add/delete events via dialogs.                                                                     |
| **FAQ**                | Accordion with dark-mode alternate backgrounds; first item open by default; animated expand icon.                                               |
| **Charts**             | Bar, Line, Pie (with external labels), and Geography (horizontal bar) using Recharts; dashboard and full-page variants.                         |
| **Light/Dark Theme**   | Toggle in topbar; theme persisted in localStorage and cookie; CSS variables in `app/globals.css` for Tailwind tokens.                           |
| **Global Header**      | Each page shows a Header with title, subtitle, and “Download Reports” button (white text/icon, theme-aware).                                    |

---

## Tech Stack

- **Next.js 16** – App Router, server/client components, metadata (SEO).
- **React 18** – Components, hooks, context.
- **TypeScript** – Typed components and data.
- **Tailwind CSS** – Utility classes; design tokens via CSS variables.
- **Material-UI (MUI) v5** – Buttons, Dialogs, TextField, Accordion, DataGrid, ThemeProvider.
- **Recharts** – Line, Bar, Pie, and custom geography-style horizontal bar charts.
- **FullCalendar** – Calendar views and event handling.
- **Formik & Yup** – Form state and validation.
- **Framer Motion** – Staggered animations on dashboard.
- **Lucide React** – Sidebar and UI icons.

---

## Project Structure

```bash
admin-dashboard/
├── app/
│   ├── layout.tsx          # Root layout: metadata, theme script, Providers
│   ├── page.tsx            # Home → Dashboard
│   ├── globals.css         # Tailwind + design tokens (:root / .dark)
│   ├── team/page.tsx
│   ├── contacts/page.tsx
│   ├── invoices/page.tsx
│   ├── form/page.tsx
│   ├── calendar/page.tsx
│   ├── faq/page.tsx
│   ├── bar/page.tsx
│   ├── pie/page.tsx
│   ├── line/page.tsx
│   └── geography/page.tsx
├── src/
│   ├── components/         # Reusable UI
│   │   ├── Header.tsx      # Page title, subtitle, Download Reports button
│   │   ├── StatBox.tsx     # KPI card with progress ring
│   │   ├── ProgressCircle.tsx
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   ├── GeographyChart.tsx
│   │   ├── DashboardLayout.tsx  # Sidebar + Topbar + main content
│   │   ├── Providers.tsx   # Theme + Sidebar providers
│   │   └── ThemeSync.tsx   # Syncs MUI theme to document .dark class
│   ├── scenes/             # Page-level views
│   │   ├── dashboard/
│   │   ├── team/
│   │   ├── contacts/
│   │   ├── invoices/
│   │   ├── form/
│   │   ├── calendar/
│   │   ├── faq/
│   │   ├── bar/
│   │   ├── pie/
│   │   ├── line/
│   │   ├── geography/
│   │   └── global/
│   │       ├── Sidebar.tsx
│   │       └── Topbar.tsx
│   ├── context/
│   │   └── SidebarContext.tsx
│   ├── data/
│   │   └── mockData.ts     # All demo data (teams, contacts, invoices, charts, etc.)
│   ├── lib/
│   │   ├── theme.ts        # MUI theme + tokens + useMode
│   │   └── utils.ts        # cn() for class names
│   ├── types/
│   │   ├── index.ts
│   │   └── fullcalendar.d.ts
│   └── hooks/
│       └── useChartContainer.ts (if present)
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       └── user.png
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── eslint.config.mjs
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** or **yarn**

### Installation

```bash
git clone <your-repo-url>
cd admin-dashboard
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs with mock data only; no backend or environment variables are required.

### Build for Production

```bash
npm run build
npm start
```

---

## Environment Variables

**You do not need any environment variables to run this project.** It works out of the box with mock data.

If you later add a backend or external services, you can use optional env vars. Next.js supports:

- `.env` – all environments
- `.env.local` – local overrides (git-ignored)
- `.env.development` / `.env.production` – per environment

Example (optional, for future use):

```bash
# .env.local (optional – not required for current demo)
# NEXT_PUBLIC_API_URL=https://api.example.com
# NEXT_PUBLIC_APP_NAME=Admin Dashboard
```

Access in code: `process.env.NEXT_PUBLIC_*`. Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Available Scripts

| Command         | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `npm run dev`   | Start Next.js dev server (default: <http://localhost:3000>). |
| `npm run build` | Build for production (Turbopack).                            |
| `npm start`     | Run production build.                                        |
| `npm run lint`  | Run ESLint on the project.                                   |

---

## Routes & Pages

| Route        | Page                 | Description                                                                                        |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------- |
| `/`          | Dashboard            | Stats, revenue line chart, campaign circle, sales bar chart, geography chart, recent transactions. |
| `/team`      | Manage Team          | DataGrid of team members (mock).                                                                   |
| `/contacts`  | Contacts Information | DataGrid of contacts (mock).                                                                       |
| `/invoices`  | Invoices Balances    | DataGrid of invoices (mock).                                                                       |
| `/form`      | Profile Form         | Create-user form (Formik + Yup).                                                                   |
| `/calendar`  | Calendar             | FullCalendar; click date to add event; click event to delete.                                      |
| `/faq`       | FAQ Page             | Accordion; first item open by default; dark-mode styling.                                          |
| `/bar`       | Bar Chart            | Full-page bar chart (Recharts).                                                                    |
| `/pie`       | Pie Chart            | Full-page pie/donut with external labels (Recharts).                                               |
| `/line`      | Line Chart           | Full-page line chart (Recharts).                                                                   |
| `/geography` | Geography Chart      | Full-page horizontal bar chart (Recharts).                                                         |

Routing is file-based: each `app/<route>/page.tsx` exports the page component. The Sidebar uses `usePathname()` and `<Link>` for navigation.

---

## Components Walkthrough

### Header

Used on every page. Renders page title, subtitle, and the global “Download Reports” button with white icon/text.

```tsx
import Header from "@/components/Header";

<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />;
```

### StatBox

Dashboard KPI card with optional progress ring and icon.

```tsx
<StatBox
  title="12,361"
  subtitle="Emails Sent"
  progress="0.75"
  increase="+14%"
  icon={<EmailIcon />}
/>
```

### Charts (LineChart, BarChart, PieChart, GeographyChart)

Each chart component accepts optional `isDashboard` for smaller labels. Data comes from `src/data/mockData.ts`. Example:

```tsx
import LineChart from "@/components/LineChart";

<LineChart isDashboard />   // compact for dashboard
<LineChart />               // full size for /line page
```

### DashboardLayout

Wraps the app with Sidebar + Topbar + scrollable main area. Used inside `Providers` in `app/layout.tsx`.

### Sidebar & Topbar

- **Sidebar:** `SidebarContext` for collapse state; `navItems` array for links; Lucide icons; active route from `usePathname()`.
- **Topbar:** Search input, theme toggle (ColorModeContext), notifications/settings/profile buttons.

---

## Key Concepts (For Learners)

- **App Router:** Next.js 16 uses the `app/` directory. Each folder can have a `page.tsx` that becomes a route (e.g. `app/team/page.tsx` → `/team`).
- **Client components:** Components that use hooks (`useState`, `useContext`) or browser APIs need `"use client"` at the top so Next.js renders them on the client.
- **Theme flow:** `layout.tsx` wraps the app with `Providers` → MUI `ThemeProvider` + `SidebarProvider`. `ThemeSync` reads the current mode and sets the `dark` class on `<html>` so Tailwind and CSS variables match.
- **Design tokens:** Colors are defined once in `theme.ts` (JS) and `globals.css` (CSS variables). Components use `var(--token-grey-100)` or Tailwind classes like `text-token-grey-100` for consistent light/dark styling.

---

## Data & Backend

There is **no backend or API**. All data is in `src/data/mockData.ts`:

- `mockDataTeam`, `mockDataContacts`, `mockDataInvoices` – for DataGrids
- `mockTransactions` – dashboard “Recent Transactions”
- `mockLineData`, `mockBarData`, `mockPieData`, `mockGeographyData` – for charts

To plug in a real API:

1. Add env vars (e.g. `NEXT_PUBLIC_API_URL`).
2. Replace imports from `mockData` with `fetch` or a data layer (e.g. React Query, SWR) in the same scenes/components.

**API endpoints:** This project does not define or call any REST or GraphQL endpoints. Tables and charts read from in-memory mock arrays. For learning, you can add a `pages/api/` or Route Handlers in `app/*/route.ts` and then call them from the front end.

---

## Theming & Customization

- **MUI theme:** `src/lib/theme.ts` – `useMode()` returns `[theme, colorMode]`; `theme.palette.mode` is `"light"` or `"dark"`.
- **Tailwind tokens:** `app/globals.css` – `:root` (light) and `.dark` (dark) define `--token-*` variables. ThemeSync syncs MUI mode to `document.documentElement.classList.toggle("dark", isDark)`.
- **Design tokens:** grey, primary, greenAccent, redAccent, blueAccent (scales 100–900). Use in Tailwind as `text-token-grey-100`, `bg-token-primary-400`, etc., or in MUI `sx` as `color: "var(--token-grey-100)"`.

---

## Reusing Components

- **In this project:** Import from `@/components/*` or `@/scenes/*`. Use `<Header title="..." subtitle="..." />` on new pages; use chart components with or without `isDashboard`.
- **In another project:** Copy `src/components`, `src/lib/theme.ts`, `app/globals.css` token section, and optionally `context/SidebarContext.tsx`. Ensure Tailwind config includes the same `token` colors (or your own). Replace mock data with your API or state.

---

## Libraries & Dependencies

| Package                                                                                               | Purpose                                            |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **next**                                                                                              | React framework; App Router; SSR/build.            |
| **react / react-dom**                                                                                 | UI library.                                        |
| **typescript**                                                                                        | Type checking.                                     |
| **@mui/material**, **@emotion/\***                                                                    | Components and styling.                            |
| **@mui/x-data-grid**                                                                                  | Tables for Team, Contacts, Invoices.               |
| **recharts**                                                                                          | Line, Bar, Pie, and custom charts.                 |
| **@fullcalendar/react**, **@fullcalendar/core**, **daygrid**, **timegrid**, **interaction**, **list** | Calendar and events.                               |
| **formik**                                                                                            | Form state.                                        |
| **yup**                                                                                               | Schema validation.                                 |
| **framer-motion**                                                                                     | Animations (e.g. dashboard stagger).               |
| **lucide-react**                                                                                      | Icons (sidebar, topbar).                           |
| **tailwindcss**                                                                                       | Utility CSS.                                       |
| **clsx**, **tailwind-merge**                                                                          | Class name helpers (`cn()` in `src/lib/utils.ts`). |
| **eslint**, **eslint-config-next**                                                                    | Linting.                                           |

### Example: Formik + Yup (Profile Form)

The form at `/form` uses **Formik** for state and **Yup** for validation. Schema and submit flow:

```tsx
const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  // ...
});

<Formik
  initialValues={initialValues}
  validationSchema={checkoutSchema}
  onSubmit={(values) => console.log(values)}
>
  {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <TextField
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!touched.firstName && !!errors.firstName}
      />
      {/* ... */}
    </form>
  )}
</Formik>;
```

This pattern is reusable in any React project: install `formik` and `yup`, define a schema, and wire inputs to Formik’s props.

---

## Keywords

React, Admin Dashboard, Next.js, TypeScript, Material-UI, Recharts, DataGrid, Sidebar, Theming, Charts, Responsive, FullCalendar, Data Visualization, Business Management, Tailwind CSS, Formik, Yup, Mock Data, Learning, Boilerplate, Open Source.

---

## Conclusion

This project is a full **front-end admin dashboard template** with no backend. It is suitable for learning Next.js App Router, React patterns, TypeScript, theming, and reusable components. You can run it without any environment variables, extend it with real APIs, or copy components into other projects. The codebase uses clear separation: `app/` for routes and layout, `src/components/` for reusable UI, `src/scenes/` for page-level views, and `src/data/mockData.ts` for all demo data.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
