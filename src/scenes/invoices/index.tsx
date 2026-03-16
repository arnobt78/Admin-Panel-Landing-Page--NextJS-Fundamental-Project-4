"use client";

/**
 * Invoices page: data grid of invoice balances.
 */
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridRenderCellParams,
  type GridColDef,
} from "@mui/x-data-grid";
import { mockDataInvoices } from "@/data/mockData";
import Header from "@/components/Header";
import type { Invoice } from "@/types";

export default function Invoices() {
  const columns: GridColDef<Invoice>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      // Style cost column with accent color
      renderCell: (params: GridRenderCellParams) => (
        <Typography className="text-token-greenAccent-500">
          ${params.row.cost}
        </Typography>
      ),
    },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  return (
    <Box className="m-4">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        className="mt-10 h-[75vh]"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: "var(--token-greenAccent-300)" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "var(--token-blueAccent-700)",
            borderBottom: "none",
            color: "#fff !important",
          },
          "& .MuiDataGrid-columnHeaders .MuiCheckbox-root": {
            color: "#fff !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "var(--token-primary-400)",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "var(--token-blueAccent-700)",
            color: "#fff !important",
          },
          "& .MuiDataGrid-footerContainer .MuiTablePagination-root": {
            color: "#fff !important",
          },
          "& .MuiDataGrid-footerContainer .MuiSelect-select": {
            color: "#fff !important",
          },
          "& .MuiDataGrid-footerContainer .MuiSvgIcon-root": {
            color: "#fff !important",
          },
          "& .MuiDataGrid-cell .MuiCheckbox-root": {
            color: "var(--token-blueAccent-700) !important",
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
}
