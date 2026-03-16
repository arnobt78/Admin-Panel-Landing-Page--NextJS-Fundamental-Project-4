"use client";

/**
 * Team page: data grid of team members with access level badges.
 */
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRenderCellParams, type GridColDef } from "@mui/x-data-grid";
import { mockDataTeam } from "@/data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "@/components/Header";
import type { TeamMember } from "@/types";

export default function Team() {
  const columns: GridColDef<TeamMember>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const access = params.row.access as string;
        const bgClass =
          access === "admin"
            ? "bg-token-greenAccent-600"
            : "bg-token-greenAccent-700";
        return (
          <Box
            className={`w-[60%] m-0 mx-auto p-1.5 flex justify-center rounded ${bgClass}`}
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography className="text-token-grey-100 ml-1.5">
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box className="m-5">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        className="mt-10 h-[75vh]"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: "var(--token-greenAccent-300)" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "var(--token-blueAccent-700)",
            borderBottom: "none",
            color: "#fff",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "var(--token-primary-400)",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "var(--token-blueAccent-700)",
            color: "#fff",
          },
          "& .MuiCheckbox-root": {
            color: "var(--token-greenAccent-200) !important",
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
}
