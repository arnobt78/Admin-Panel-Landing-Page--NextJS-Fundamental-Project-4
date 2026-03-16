"use client";

/**
 * Page header: title, subtitle, and Download Reports button.
 * Reusable across all dashboard pages for consistent headings.
 */
import { Typography, Box, Button } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    // Layout: title/subtitle on left; Download Reports button on right (same on every page)
    <Box className="mb-[30px] flex justify-between items-start">
      <Box>
        <Typography
          variant="h2"
          className="text-token-grey-100 font-bold mb-[5px]"
        >
          {title}
        </Typography>
        <Typography variant="h5" className="text-token-greenAccent-400">
          {subtitle}
        </Typography>
      </Box>
      <Button
        sx={{
          bgcolor: "var(--token-blueAccent-700)",
          color: "rgba(255,255,255,0.8)",
          fontSize: 12,
          fontWeight: 700,
          py: 1.25,
          px: 2,
          "&:hover": {
            bgcolor: "var(--token-blueAccent-600)",
            color: "rgba(255,255,255,0.9)",
          },
        }}
      >
        <DownloadOutlinedIcon
          sx={{ mr: 1.25, fontSize: 20, color: "rgba(255,255,255,0.8)" }}
        />
        Download Reports
      </Button>
    </Box>
  );
}
