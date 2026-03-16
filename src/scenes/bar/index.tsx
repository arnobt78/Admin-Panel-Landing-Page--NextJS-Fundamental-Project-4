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

  useEffect(() => {
    function checkSize() {
      if (chartContainerRef.current) {
        const { width, height } =
          chartContainerRef.current.getBoundingClientRect();
        setContainerReady(width > 0 && height > 0);
      }
    }
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [isCollapsed]);

  return (
    <Box className="m-5">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box ref={chartContainerRef} className="h-[75vh] min-h-[300px] w-full">
        {containerReady && (
          <BarChart key={isCollapsed ? "collapsed" : "expanded"} />
        )}
      </Box>
    </Box>
  );
}
