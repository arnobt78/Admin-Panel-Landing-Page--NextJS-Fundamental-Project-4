"use client";

/**
 * Line chart page: full-size line chart.
 */
import { Box } from "@mui/material";
import Header from "@/components/Header";
import LineChart from "@/components/LineChart";
import { useRef, useState, useEffect } from "react";

export default function Line() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerReady, setContainerReady] = useState(false);

  // ResizeObserver: render chart only when container has dimensions
  useEffect(() => {
    const el = chartContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? {
        width: 0,
        height: 0,
      };
      setContainerReady(width > 0 && height > 0);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Box className="m-4">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box ref={chartContainerRef} className="h-[75vh]">
        {containerReady && <LineChart />}
      </Box>
    </Box>
  );
}
