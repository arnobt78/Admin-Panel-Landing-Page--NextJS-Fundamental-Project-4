"use client";

/**
 * Hook to detect when a chart container has valid dimensions.
 * Use when rendering charts (e.g. Recharts) so they only mount after the container has width/height (avoids layout warnings).
 */
import { useRef, useState, useEffect } from "react";

export function useChartContainer() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setReady(width > 0 && height > 0);
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return { ref, ready };
}
