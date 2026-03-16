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
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box ref={chartContainerRef} className="h-[75vh] min-h-[300px] w-full">
        {containerReady && (
          <PieChart key={isCollapsed ? "collapsed" : "expanded"} />
        )}
      </Box>
    </Box>
  );
}
