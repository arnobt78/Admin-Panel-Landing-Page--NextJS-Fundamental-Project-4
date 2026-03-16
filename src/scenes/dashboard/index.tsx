"use client";

/**
 * Dashboard (home): stat cards (StatBox), revenue line chart, campaign progress, sales bar chart,
 * geography chart, recent transactions. Uses ResizeObserver so charts render only when container has size.
 */
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import Header from "@/components/Header";
import StatBox from "@/components/StatBox";
import ProgressCircle from "@/components/ProgressCircle";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import GeographyChart from "@/components/GeographyChart";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { mockTransactions } from "@/data/mockData";

// Framer Motion: subtle entrance animation for grid items
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const stagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function Dashboard() {
  const lineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const geoRef = useRef<HTMLDivElement>(null);
  const [lineReady, setLineReady] = useState(false);
  const [barReady, setBarReady] = useState(false);
  const [geoReady, setGeoReady] = useState(false);

  // Wait for chart containers to have dimensions before rendering (avoids Recharts width/height warnings)
  useEffect(() => {
    const refs = [
      [lineRef, setLineReady],
      [barRef, setBarReady],
      [geoRef, setGeoReady],
    ] as const;
    const observers: ResizeObserver[] = [];
    refs.forEach(([ref, setReady]) => {
      if (!ref.current) return;
      const ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          const { width, height } = entry.contentRect;
          setReady(width > 0 && height > 0);
        }
      });
      ro.observe(ref.current);
      observers.push(ro);
    });
    return () => observers.forEach((ro) => ro.disconnect());
  }, []);

  return (
    <div className="min-h-full p-4">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <motion.div
        className="grid grid-cols-12 auto-rows-[140px] gap-4"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="col-span-3 flex items-center justify-center bg-token-primary-400 rounded-xl"
          variants={fadeInUp}
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon className="text-token-greenAccent-600 text-[26px]" />
            }
          />
        </motion.div>
        <motion.div
          className="col-span-3 flex items-center justify-center bg-token-primary-400 rounded-xl"
          variants={fadeInUp}
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon className="text-token-greenAccent-600 text-[26px]" />
            }
          />
        </motion.div>
        <motion.div
          className="col-span-3 flex items-center justify-center bg-token-primary-400 rounded-xl"
          variants={fadeInUp}
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon className="text-token-greenAccent-600 text-[26px]" />
            }
          />
        </motion.div>
        <motion.div
          className="col-span-3 flex items-center justify-center bg-token-primary-400 rounded-xl"
          variants={fadeInUp}
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon className="text-token-greenAccent-600 text-[26px]" />
            }
          />
        </motion.div>

        <motion.div
          className="col-span-8 row-span-2 bg-token-primary-400 rounded-xl overflow-hidden"
          variants={fadeInUp}
        >
          <Box className="mt-6 px-[30px] flex justify-between items-center">
            <Box>
              <Typography
                variant="h5"
                className="font-semibold text-token-grey-100"
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                className="font-bold text-token-greenAccent-500"
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon className="text-[26px] text-token-greenAccent-500" />
              </IconButton>
            </Box>
          </Box>
          <Box className="h-[250px] min-h-[200px] w-full -mt-5" ref={lineRef}>
            {lineReady && <LineChart isDashboard={true} />}
          </Box>
        </motion.div>
        <motion.div
          className="col-span-4 row-span-2 bg-token-primary-400 overflow-auto rounded-xl"
          variants={fadeInUp}
        >
          <Box className="flex justify-between items-center border-b-4 border-token-primary-500 p-4">
            <Typography
              variant="h5"
              className="font-semibold text-token-grey-100"
            >
              Recent Transactions
            </Typography>
          </Box>
          {(mockTransactions ?? []).map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              className="flex justify-between items-center border-b-4 border-token-primary-500 p-4"
            >
              <Box>
                <Typography
                  variant="h5"
                  className="font-semibold text-token-greenAccent-500"
                >
                  {transaction.txId}
                </Typography>
                <Typography className="text-token-grey-100">
                  {transaction.user}
                </Typography>
              </Box>
              <Box className="text-token-grey-100">{transaction.date}</Box>
              <Box className="bg-token-greenAccent-500 py-1.5 px-2.5 rounded">
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </motion.div>

        <motion.div
          className="col-span-4 row-span-2 bg-token-primary-400 p-[30px] rounded-xl"
          variants={fadeInUp}
        >
          <Typography variant="h5" className="font-semibold">
            Campaign
          </Typography>
          <Box className="flex flex-col items-center mt-6 relative">
            <Tooltip title="75% progress · $48,352 revenue" placement="top" arrow>
              <Box component="span" sx={{ display: "inline-block", position: "relative" }}>
                <ProgressCircle size="125" />
                <Typography
                  component="span"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--token-grey-100)",
                  }}
                >
                  75%
                </Typography>
              </Box>
            </Tooltip>
            <Typography
              variant="h5"
              className="text-token-greenAccent-500 mt-4"
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </motion.div>
        <motion.div
          className="col-span-4 row-span-2 bg-token-primary-400 rounded-xl overflow-hidden"
          variants={fadeInUp}
        >
          <Typography
            variant="h5"
            className="font-semibold pt-[30px] px-[30px]"
          >
            Sales Quantity
          </Typography>
          <Box className="h-[250px] min-h-[200px] w-full -mt-5 overflow-hidden" ref={barRef}>
            {barReady && <BarChart isDashboard={true} />}
          </Box>
        </motion.div>
        <motion.div
          className="col-span-4 row-span-2 p-[30px] bg-token-primary-400 rounded-xl"
          variants={fadeInUp}
        >
          <Typography variant="h5" className="font-semibold mb-4">
            Geography Based Traffic
          </Typography>
          <Box className="h-[200px] min-h-[150px] w-full" ref={geoRef}>
            {geoReady && <GeographyChart isDashboard={true} />}
          </Box>
        </motion.div>
      </motion.div>
    </div>
  );
}
