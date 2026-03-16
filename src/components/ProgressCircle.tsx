"use client";

/**
 * Circular progress indicator (conic gradient).
 * Used in StatBox and Campaign section; progress is 0–1 as string (e.g. "0.75").
 */
import { Box, useTheme } from "@mui/material";
import { tokens } from "@/lib/theme";

interface ProgressCircleProps {
  progress?: string;
  size?: string;
}

export default function ProgressCircle({
  progress = "0.75",
  size = "40",
}: ProgressCircleProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode as "light" | "dark");
  // progress "0.75" → 270deg filled; conic-gradient draws the arc
  const angle = parseFloat(progress) * 360;
  return (
    <Box
      sx={{
        // Radial center hole + conic arc + green base; theme-aware
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
