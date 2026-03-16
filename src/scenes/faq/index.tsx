"use client";

/**
 * FAQ page: accordion of sample questions and answers.
 */
import { Box } from "@mui/material";
import Header from "@/components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTheme } from "@mui/material/styles";

const FAQ_ITEMS = [
  { question: "An Important Question", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
  { question: "Another Important Question", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
  { question: "Your Favorite Question", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
  { question: "Some Random Question", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
  { question: "The Final Question", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget." },
];

// Alternate background colors per accordion in dark mode for visual separation
const DARK_FAQ_BG = [
  "var(--token-primary-400)",
  "#252d42",
  "#1a2235",
  "#2a3450",
  "#151b2a",
];

export default function FAQ() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="m-4">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
      {FAQ_ITEMS.map((item, i) => (
        <Accordion
          key={item.question}
          defaultExpanded={i === 0}
          sx={{
            // First item open by default; dark mode: alternate bg per item
            ...(isDark && {
              bgcolor: DARK_FAQ_BG[i % DARK_FAQ_BG.length],
              "&:before": { display: "none" },
            }),
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-expandIconWrapper": {
                transition: "transform 0.3s ease",
              },
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "rotate(180deg)",
              },
            }}
          >
            <Typography className="text-token-greenAccent-500" variant="h5">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: isDark ? "var(--token-grey-100)" : undefined }}>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
