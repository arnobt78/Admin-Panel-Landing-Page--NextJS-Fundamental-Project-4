"use client";

/**
 * Bar chart page: full-size bar chart with legend.
 */
import { Box } from "@mui/material";
import Header from "@/components/Header";
import BarChart from "@/components/BarChart";
import { useContext, useRef, useState, useEffect } from "react";
import { SidebarContext } from "@/context/SidebarContext";

export default function Bar() {
  const { isCollapsed } = useContext(SidebarContext);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerReady, setContainerReady] = useState(false);

  // ResizeObserver: only render chart when container has dimensions (avoids Recharts warnings)
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
  }, [isCollapsed]);

  return (
    <Box className="m-4">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box ref={chartContainerRef} className="h-[75vh] min-h-[300px] w-full">
        {containerReady && (
          <BarChart key={isCollapsed ? "collapsed" : "expanded"} />
        )}
      </Box>
    </Box>
  );
}
