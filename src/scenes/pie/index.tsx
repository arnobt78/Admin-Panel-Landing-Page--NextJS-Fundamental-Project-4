"use client";

/**
 * Pie chart page: full-size pie chart.
 */
import { Box } from "@mui/material";
import Header from "@/components/Header";
import PieChart from "@/components/PieChart";
import { useContext, useRef, useState, useEffect } from "react";
import { SidebarContext } from "@/context/SidebarContext";

export default function Pie() {
  const { isCollapsed } = useContext(SidebarContext);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerReady, setContainerReady] = useState(false);

  // ResizeObserver: render chart only when container has size; re-run when sidebar toggles
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
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box ref={chartContainerRef} className="h-[75vh] min-h-[300px] w-full">
        {containerReady && (
          <PieChart key={isCollapsed ? "collapsed" : "expanded"} />
        )}
      </Box>
    </Box>
  );
}
