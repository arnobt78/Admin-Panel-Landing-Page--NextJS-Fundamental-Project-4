"use client";

/**
 * Line chart (Nivo ResponsiveLine) for time/series data.
 * Supports dashboard mode (no axis labels) and full legend.
 */
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "@/lib/theme";
import { mockLineData as data } from "@/data/mockData";

interface LineChartProps {
  isCustomLineColors?: boolean;
  isDashboard?: boolean;
}

export default function LineChart({
  isDashboard = false,
}: LineChartProps) {
  const theme = useTheme();
  const mode = theme?.palette?.mode ?? "dark";
  const colors = tokens(mode as "light" | "dark");
  const safeData = Array.isArray(data)
    ? data.map((s) => ({
        ...s,
        id: s?.id ?? "",
        data: Array.isArray(s?.data) ? s.data : [],
      }))
    : [];
  if (safeData.length === 0 || safeData.every((s) => s.data.length === 0)) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center text-token-grey-400">
        No line data
      </div>
    );
  }
  return (
    <ResponsiveLine
      data={safeData}
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: { container: { color: colors.primary[500] } },
      }}
      colors={{ scheme: "nivo" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: { itemBackground: "rgba(0, 0, 0, .03)", itemOpacity: 1 },
            },
          ],
        },
      ]}
    />
  );
}
