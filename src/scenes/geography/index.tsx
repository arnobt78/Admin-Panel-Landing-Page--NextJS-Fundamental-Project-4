"use client";

/**
 * Geography chart page: full-size horizontal bar chart (id + value). Uses ResizeObserver for container size.
 */
import { Box } from "@mui/material";
import GeographyChart from "@/components/GeographyChart";
import { useContext, useRef, useState, useEffect } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import Header from "@/components/Header";

export default function Geography() {
  const { isCollapsed } = useContext(SidebarContext);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerReady, setContainerReady] = useState(false);

  // ResizeObserver: render when container has size; key by isCollapsed so chart resizes on sidebar toggle
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
      <Header title="Geography" subtitle="Simple Geography Chart" />
      <Box
        ref={chartContainerRef}
        className="h-[75vh] min-h-[300px] w-full border border-token-grey-100 rounded"
      >
        {containerReady && (
          <GeographyChart key={isCollapsed ? "collapsed" : "expanded"} />
        )}
      </Box>
    </Box>
  );
}
