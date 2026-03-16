"use client";

/**
 * Bar chart (Recharts): grouped bars by country (mockBarData). Used on dashboard and /bar page.
 * KEYS = stack keys per row; each Bar gets a LabelList on top.
 */
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { mockBarData } from "@/data/mockData";

interface BarChartProps {
  isDashboard?: boolean;
}

const KEYS = ["hot dog", "burger", "kebab", "donut"];
const COLORS = ["#4cceac", "#70d8bd", "#868dfb", "#e2726e"];

export default function BarChart({ isDashboard = false }: BarChartProps) {
  const data = Array.isArray(mockBarData) ? mockBarData : [];

  if (data.length === 0) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center text-token-grey-500">
        No bar data
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={150} initialDimension={{ width: 1, height: 1 }}>
      <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="country" stroke="#a3a3a3" tick={{ fontSize: 12 }} hide={isDashboard} />
        <YAxis stroke="#a3a3a3" tick={{ fontSize: 12 }} hide={isDashboard} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2a40", border: "none", borderRadius: 8, outline: "none", boxShadow: "none" }}
          labelStyle={{ color: "#fff" }}
          cursor={{ stroke: "transparent" }}
        />
        {!isDashboard && <Legend />}
        {/* One Bar per category; radius for rounded top corners */}
        {KEYS.map((key, i) => (
          <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]}>
            <LabelList dataKey={key} position="top" fill="var(--token-grey-100)" fontSize={isDashboard ? 8 : 10} formatter={(v) => (typeof v === "number" ? v.toLocaleString() : String(v ?? ""))} />
          </Bar>
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
