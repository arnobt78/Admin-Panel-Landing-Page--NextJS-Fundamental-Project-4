"use client";

/**
 * Line chart (Recharts): revenue/time series. Used on dashboard (compact) and /line page (full).
 * Data: mockLineData = array of series { id, color, data: [{ x, y }] }. Transformed to flat points per x.
 */
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { mockLineData } from "@/data/mockData";

interface LineChartProps {
  isDashboard?: boolean;
}

const COLORS = ["#4cceac", "#70d8bd", "#e2726e"];

/** Pivot series-by-x into points { x, series1, series2, ... } for Recharts. */
function transformLineData(series: Array<{ id: string; data: Array<{ x: string; y: number }> }>) {
  if (!series.length) return [];
  const keys = series.map((s) => s.id);
  const xValues = series[0]?.data?.map((d) => d.x) ?? [];
  return xValues.map((x, i) => {
    const point: Record<string, string | number> = { x };
    keys.forEach((k, j) => {
      point[k] = series[j]?.data?.[i]?.y ?? 0;
    });
    return point;
  });
}

export default function LineChart({ isDashboard = false }: LineChartProps) {
  const raw = Array.isArray(mockLineData) ? mockLineData : [];
  const series = raw.filter((s) => Array.isArray(s?.data) && s.data.length > 0);
  const data = series.length > 0 ? transformLineData(series) : [];

  if (data.length === 0) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center text-token-grey-500">
        No line data
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={150} initialDimension={{ width: 1, height: 1 }}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        {/* Hide axes on dashboard for a cleaner compact look */}
        <XAxis dataKey="x" stroke="#a3a3a3" tick={{ fontSize: 12 }} hide={isDashboard} />
        <YAxis stroke="#a3a3a3" tick={{ fontSize: 12 }} hide={isDashboard} />
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2a40", border: "none", borderRadius: 8, outline: "none" }}
          labelStyle={{ color: "#fff" }}
          cursor={{ stroke: "transparent" }}
        />
        {!isDashboard && <Legend />}
        {/* One Line per series; LabelList shows value on top of each point */}
        {series.slice(0, 3).map((s, i) => (
          <Line
            key={s.id}
            type="monotone"
            dataKey={s.id}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            connectNulls
          >
            <LabelList dataKey={s.id} position="top" fill="var(--token-grey-100)" fontSize={isDashboard ? 8 : 10} formatter={(v) => (typeof v === "number" ? v.toLocaleString() : String(v ?? ""))} />
          </Line>
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
