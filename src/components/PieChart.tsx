"use client";

/**
 * Pie/Donut chart (Recharts): mockPieData with label + value. External labels show "Label XX%" with connector lines.
 */
import { PieChart as RechartsPieChart, Pie, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { mockPieData } from "@/data/mockData";

const COLORS = ["#4cceac", "#70d8bd", "#868dfb", "#e2726e", "#eed312"];

const RADIAN = Math.PI / 180;

/** Place label outside slice: position from midAngle, same color as slice; format "Label 42%". */
function renderCustomLabel(props: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  payload?: { label?: string; fill?: string; value?: number };
  percent?: number;
}) {
  const { cx = 0, cy = 0, midAngle = 0, outerRadius = 80, payload, percent } = props;
  const radius = outerRadius + 24;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const pct = percent != null ? `${(percent * 100).toFixed(0)}%` : "";
  const text = `${payload?.label ?? ""} ${pct}`.trim();
  const fill = payload?.fill ?? "#666";
  const textAnchor = x >= cx ? "start" : "end";
  return (
    <text x={x} y={y} fill={fill} textAnchor={textAnchor} fontSize={12} dominantBaseline="central">
      {text}
    </text>
  );
}

export default function PieChart() {
  const data = Array.isArray(mockPieData) ? mockPieData : [];
  const total = data.reduce((s, d) => s + (d.value ?? 0), 0);
  // Recharts Pie expects fill per segment; assign from COLORS by index
  const dataWithFill = data.map((entry, i) => ({
    ...entry,
    fill: COLORS[i % COLORS.length],
  }));

  if (data.length === 0) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center text-token-grey-500">
        No pie data
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={150} initialDimension={{ width: 1, height: 1 }}>
      <RechartsPieChart>
        <Pie
          data={dataWithFill}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          nameKey="label"
          label={renderCustomLabel}
          labelLine={{ stroke: "var(--token-grey-400)", strokeWidth: 1 }}
        />
        {/* Tooltip shows value and % of total */}
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2a40", border: "none", borderRadius: 8, color: "#fff" }}
          formatter={(value, name) => [
            // Display value and percentage of total
            `${typeof value === "number" ? value : 0} (${total ? (((typeof value === "number" ? value : 0) / total) * 100).toFixed(1) : 0}%)`,
            String(name ?? ""),
          ]}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
