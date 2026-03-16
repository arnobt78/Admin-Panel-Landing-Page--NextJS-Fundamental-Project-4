"use client";

/**
 * Geography-style chart: horizontal bar chart (Recharts BarChart layout="vertical").
 * Data: mockGeographyData { id, value }; used on dashboard and /geography page.
 */
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList } from "recharts";
import { mockGeographyData } from "@/data/mockData";

interface GeographyChartProps {
  isDashboard?: boolean;
}

export default function GeographyChart({ isDashboard = false }: GeographyChartProps) {
  const data = Array.isArray(mockGeographyData) ? mockGeographyData.slice(0, 12) : [];

  if (data.length === 0) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center text-token-grey-500">
        Map data unavailable
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={150} initialDimension={{ width: 1, height: 1 }}>
      <RechartsBarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
        {/* Vertical layout: Y = category (id), X = value */}
        <XAxis type="number" stroke="#a3a3a3" tick={{ fontSize: 10 }} hide={isDashboard} />
        <YAxis type="category" dataKey="id" stroke="#a3a3a3" tick={{ fontSize: 10 }} width={40} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2a40", border: "none", borderRadius: 8, color: "#fff" }}
          labelStyle={{ color: "#fff" }}
          formatter={(v) => (typeof v === "number" ? v.toLocaleString() : String(v ?? ""))}
        />
        <Bar dataKey="value" fill="#4cceac" radius={[0, 4, 4, 0]}>
          <LabelList dataKey="value" position="right" fill="var(--token-grey-100)" fontSize={isDashboard ? 8 : 10} formatter={(v) => (typeof v === "number" ? v.toLocaleString() : String(v ?? ""))} />
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
