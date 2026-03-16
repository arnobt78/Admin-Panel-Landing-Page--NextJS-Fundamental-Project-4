"use client";

/**
 * Geography chart page: full-size world choropleth.
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
