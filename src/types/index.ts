/**
 * Shared TypeScript types for the admin dashboard.
 * Used by mockData, chart components, form, DataGrids, and context.
 */

export type PaletteMode = "light" | "dark";

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  access: "admin" | "manager" | "user";
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  registrarId: number;
}

export interface Invoice {
  id: number;
  name: string;
  email: string;
  cost: string;
  phone: string;
  date: string;
}

export interface Transaction {
  txId: string;
  user: string;
  date: string;
  cost: string;
}

export interface BarDataItem {
  country: string;
  "hot dog": number;
  "hot dogColor"?: string;
  burger: number;
  burgerColor?: string;
  kebab: number;
  kebabColor?: string;
  donut: number;
  donutColor?: string;
  fries?: number;
  friesColor?: string;
  sandwich?: number;
  sandwichColor?: string;
}

export interface PieDataItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface LineDataPoint {
  x: string;
  y: number;
}

export interface LineDataSeries {
  id: string;
  color: string;
  data: LineDataPoint[];
}

export interface GeographyDataItem {
  id: string;
  value: number;
}

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
}

export interface SidebarContextValue {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export interface ColorModeContextValue {
  toggleColorMode: () => void;
}
