import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  styled,
  TableRow,
} from "@mui/material";
import moment from "moment";
interface Column {
  id: "category" | "date" | "description" | "amount" | "balance";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columns: readonly Column[] = [
  { id: "category", label: "Category", minWidth: 140 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "amount", label: "Amount", minWidth: 100 },
  { id: "balance", label: "Balance", minWidth: 100 },
];
interface TableData {
  category: string;
  date: string;
  description: string;
  amount: number;
  balance: number;
}
const createData = (
  category: string,
  date: string,
  description: string,
  amount: number,
  balance: number
): TableData => {
  return { category, date, description, amount, balance };
};

const rows = [
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "2",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "3",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1354",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1354",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1354",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1354",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1354",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1354",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1354",
    263,
    4343
  ),
  createData(
    "India",
    moment(new Date().toString()).format("ll"),
    "1354",
    263,
    4343
  ),
];

const cellStyle = {
  fontFamily: "Inter, -apple-system, sans-serif",
  fontWeight: 700,
  fontSize: "16px",
  color: "#83b0f3",
  borderBottom: "2px solid #83b0f3  ",
};

const dataCellStyle = {
  fontFamily: "Inter, -apple-system, sans-serif",
  fontWeight: 400,
  fontSize: "16px",
};

export const FinanceTable = () => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="finance-table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  sx={{
                    ...cellStyle,
                    minWidth: col.minWidth,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              return (
                <TableRow hover tabIndex={-1} key={`${row.category}-${idx}`}>
                  {columns.map((col, idx) => {
                    const value = row[col.id];
                    return (
                      <TableCell
                        key={`${col.id}-${idx}`}
                        sx={{
                          ...dataCellStyle,
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
