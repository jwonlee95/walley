import React, { useContext, useEffect, useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
} from "@mui/material";
import { StateContext } from "contexts";
import { ICategory } from "interfaces";
import produce from "immer";
import moment from "moment";

const cellStyle = {
  fontFamily: "Inter, -apple-system, sans-serif",
  fontWeight: 700,
  fontSize: "14px",
  color: "#83b0f3",
  borderBottom: "2px solid #83b0f3",
  padding: "10px",
};
const dataCellStyle = {
  fontFamily: "Inter, -apple-system, sans-serif",
  fontWeight: 400,
  fontSize: "14px",
  padding: "10px",
};

interface Column {
  id: "date" | "description" | "amount";
  label: string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Date " },
  { id: "description", label: "Description " },
  { id: "amount", label: "Amount " },
];

interface CategoryData {
  date: string;
  description: string;
  amount: number;
  _id: string;
}

const createRowData = (
  date: string,
  description: string,
  amount: number,
  _id: string
): CategoryData => {
  return { date, description, amount, _id };
};

interface ICategoryTableProps {
  category: ICategory | undefined;
}
export const CategoryTable: React.FC<ICategoryTableProps> = ({ category }) => {
  const { transaction } = useContext(StateContext);

  const [rows, setRows] = useState<CategoryData[]>([]);

  useEffect(() => {
    if (category) {
      const newData = transaction.filter(
        (trans) => trans.category === category.name
      );
      newData.map((data) =>
        setRows(
          produce((draft) => {
            draft.push(
              createRowData(
                moment(data.date).format("ll"),
                data.description,
                data.amount,
                data._id
              )
            );
          })
        )
      );
    }
  }, [category]);

  return (
    <Card
      variant="outlined"
      className="cm-card flex"
      sx={{
        height: "200px",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
        <TableContainer sx={{ maxHeight: 200 }}>
          <Table stickyHeader aria-label="category-table">
            <TableHead sx={{ height: "10px" }}>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} align="center" sx={{ ...cellStyle }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={`${row._id}`}
                    className="table-row"
                  >
                    {columns.map((col, idx) => {
                      const value = row[col.id];

                      return (
                        <TableCell
                          key={`${col.id}-${idx}`}
                          sx={{ ...dataCellStyle, m: 0 }}
                          align="center"
                        >
                          {col.id === "amount" ? `$ ${value}` : value}
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
    </Card>
  );
};
