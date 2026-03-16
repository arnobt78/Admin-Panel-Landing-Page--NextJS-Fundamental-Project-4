"use client";

import { PieChart as RechartsPieChart, Pie, ResponsiveContainer, Legend, Tooltip, LabelList } from "recharts";
import { mockPieData } from "@/data/mockData";

const COLORS = ["#4cceac", "#70d8bd", "#868dfb", "#e2726e", "#eed312"];

export default function PieChart() {
  const data = Array.isArray(mockPieData) ? mockPieData : [];
  const total = data.reduce((s, d) => s + (d.value ?? 0), 0);
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
    <ResponsiveContainer width="100%" height="100%" minHeight={150}>
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
        >
          <LabelList
            dataKey="value"
            position="outside"
            valueAccessor={(entry) => {
              const value = entry.value as number;
              const label = (entry.payload as { label?: string })?.label ?? "";
              const pct = total ? (((value ?? 0) / total) * 100).toFixed(0) : "0";
              return `${label} ${pct}%`;
            }}
            content={(props: unknown) => {
              const p = props as { payload?: { fill?: string }; valueAccessor?: (e: unknown) => unknown; value?: unknown; x?: number; y?: number; textAnchor?: string };
              const fill = p.payload?.fill ?? "#666";
              const value = p.valueAccessor?.(p) ?? p.value;
              return (
                <text x={p.x} y={p.y} fill={fill} textAnchor={(p.textAnchor as "start" | "middle" | "end") ?? "middle"} fontSize={12}>
                  {String(value ?? "")}
                </text>
              );
            }}
          />
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#1f2a40", border: "none", borderRadius: 8, color: "#fff" }}
          formatter={(value, name) => [
            `${typeof value === "number" ? value : 0} (${total ? (((typeof value === "number" ? value : 0) / total) * 100).toFixed(1) : 0}%)`,
            String(name ?? ""),
          ]}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
