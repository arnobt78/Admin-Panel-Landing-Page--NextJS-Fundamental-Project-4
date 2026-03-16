"use client";

import { useRef, useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { SidebarContext } from "@/context/SidebarContext";
import Header from "@/components/Header";
import StatBox from "@/components/StatBox";
import ProgressCircle from "@/components/ProgressCircle";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import GeographyChart from "@/components/GeographyChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { mockTransactions } from "@/data/mockData";

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
  const { isCollapsed } = useContext(SidebarContext);
  const lineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const geoRef = useRef<HTMLDivElement>(null);
  const [lineReady, setLineReady] = useState(false);
  const [barReady, setBarReady] = useState(false);
  const [geoReady, setGeoReady] = useState(false);
  const [sidebarTransitioning, setSidebarTransitioning] = useState(false);

  useEffect(() => {
    const sidebar = document.querySelector(".app-sidebar");
    if (!sidebar) return;
    const handleTransitionStart = () => setSidebarTransitioning(true);
    const handleTransitionEnd = () => setSidebarTransitioning(false);
    sidebar.addEventListener("transitionstart", handleTransitionStart);
    sidebar.addEventListener("transitionend", handleTransitionEnd);
    if (getComputedStyle(sidebar).transitionDuration === "0s") {
      queueMicrotask(() => setSidebarTransitioning(false));
    }
    return () => {
      sidebar.removeEventListener("transitionstart", handleTransitionStart);
      sidebar.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isCollapsed]);

  useEffect(() => {
    const checkSize = (
      ref: React.RefObject<HTMLDivElement>,
      setReady: (v: boolean) => void
    ) => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setReady(width > 0 && height > 0);
      }
    };
    const handleResize = () => {
      checkSize(lineRef, setLineReady);
      checkSize(barRef, setBarReady);
      checkSize(geoRef, setGeoReady);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  return (
    <div className="min-h-full p-5">
      <motion.div
        className="mb-8 rounded-2xl border border-token-primary-600 bg-token-primary-400/80 p-6 backdrop-blur-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm font-medium uppercase tracking-wider text-token-greenAccent-500">
          React fundamentals · Learning project
        </p>
        <h1 className="mt-2 font-sans text-2xl font-bold tracking-tight text-token-grey-100 md:text-3xl">
          Welcome to your dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-token-grey-300">
          This educational project demonstrates core React concepts: reusable components, Context API for theme and sidebar state, custom hooks, TypeScript types, and Tailwind CSS. Explore the sidebar to see charts, forms, and data tables.
        </p>
      </motion.div>

      <Box className="flex justify-between items-center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button className="bg-token-blueAccent-700 text-token-grey-100 text-sm font-bold py-2.5 px-5">
            <DownloadOutlinedIcon className="mr-2.5" />
            Download Reports
          </Button>
        </Box>
      </Box>

      <motion.div
        className="grid grid-cols-12 auto-rows-[140px] gap-5"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.div className="col-span-3 flex items-center justify-center bg-token-primary-400 rounded-xl" variants={fadeInUp}>
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={<EmailIcon className="text-token-greenAccent-600 text-[26px]" />}
          />
        </motion.div>
        <motion.div className="col-span-3 flex items-center justify-center bg-token-primary-400 rounded-xl" variants={fadeInUp}>
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={<PointOfSaleIcon className="text-token-greenAccent-600 text-[26px]" />}
          />
        </motion.div>
        <motion.div className="col-span-3 flex items-center justify-center bg-token-primary-400 rounded-xl" variants={fadeInUp}>
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={<PersonAddIcon className="text-token-greenAccent-600 text-[26px]" />}
          />
        </motion.div>
        <motion.div className="col-span-3 flex items-center justify-center bg-token-primary-400 rounded-xl" variants={fadeInUp}>
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={<TrafficIcon className="text-token-greenAccent-600 text-[26px]" />}
          />
        </motion.div>

        <motion.div className="col-span-8 row-span-2 bg-token-primary-400 rounded-xl overflow-hidden" variants={fadeInUp}>
          <Box className="mt-6 px-[30px] flex justify-between items-center">
            <Box>
              <Typography variant="h5" className="font-semibold text-token-grey-100">
                Revenue Generated
              </Typography>
              <Typography variant="h3" className="font-bold text-token-greenAccent-500">
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon className="text-[26px] text-token-greenAccent-500" />
              </IconButton>
            </Box>
          </Box>
          <Box className="h-[250px] -mt-5" ref={lineRef}>
            {lineReady && !sidebarTransitioning && (
              <LineChart
                isDashboard={true}
                key={isCollapsed ? "collapsed" : "expanded"}
              />
            )}
          </Box>
        </motion.div>
        <motion.div className="col-span-4 row-span-2 bg-token-primary-400 overflow-auto rounded-xl" variants={fadeInUp}>
          <Box className="flex justify-between items-center border-b-4 border-token-primary-500 p-4">
            <Typography variant="h5" className="font-semibold text-token-grey-100">
              Recent Transactions
            </Typography>
          </Box>
          {(mockTransactions ?? []).map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              className="flex justify-between items-center border-b-4 border-token-primary-500 p-4"
            >
              <Box>
                <Typography variant="h5" className="font-semibold text-token-greenAccent-500">
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

        <motion.div className="col-span-4 row-span-2 bg-token-primary-400 p-[30px] rounded-xl" variants={fadeInUp}>
          <Typography variant="h5" className="font-semibold">
            Campaign
          </Typography>
          <Box className="flex flex-col items-center mt-6">
            <ProgressCircle size="125" />
            <Typography variant="h5" className="text-token-greenAccent-500 mt-4">
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </motion.div>
        <motion.div className="col-span-4 row-span-2 bg-token-primary-400 rounded-xl" variants={fadeInUp}>
          <Typography variant="h5" className="font-semibold pt-[30px] px-[30px]">
            Sales Quantity
          </Typography>
          <Box className="h-[250px] -mt-5" ref={barRef}>
            {barReady && !sidebarTransitioning && (
              <BarChart
                isDashboard={true}
                key={isCollapsed ? "collapsed" : "expanded"}
              />
            )}
          </Box>
        </motion.div>
        <motion.div className="col-span-4 row-span-2 p-[30px] bg-token-primary-400 rounded-xl" variants={fadeInUp}>
          <Typography variant="h5" className="font-semibold mb-4">
            Geography Based Traffic
          </Typography>
          <Box className="h-[200px]" ref={geoRef}>
            {geoReady && !sidebarTransitioning && (
              <GeographyChart
                isDashboard={true}
                key={isCollapsed ? "collapsed" : "expanded"}
              />
            )}
          </Box>
        </motion.div>
      </motion.div>
    </div>
  );
}
