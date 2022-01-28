import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  styled,
  TableRow,
  Icon,
} from "@mui/material";
import moment from "moment";
import produce from "immer";
import { StateContext } from "contexts";
import { TransactionDetailModal } from "components";
import { ITransaction } from "interfaces/transaction";
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
  icon: string;
  color: string;
  category: string;
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: string;
}
const createData = (
  icon: string,
  color: string,
  category: string,
  date: string,
  description: string,
  amount: number,
  balance: number,
  type: string
): TableData => {
  return { icon, color, category, date, description, amount, balance, type };
};

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
  const { transaction, category } = useContext(StateContext);
  const [rows, setRows] = useState<TableData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction>();
  const [categoryMapping, setCategoryMapping] = useState<object>({});
  useEffect(() => {}, []);
  // useEffect(() => {
  //   for (const ele of transaction) {
  //     const _category = ele.category;
  //     for (const cate of category) {
  //       if (cate.name === _category) {
  //         console.log("SET ROWS");
  //         setRows(
  //           produce((draft) => {
  //             draft.push(
  //               createData(
  //                 cate.icon,
  //                 cate.color,
  //                 _category,
  //                 moment(ele.date).format("ll"),
  //                 ele.description,
  //                 ele.amount,
  //                 0,
  //                 ele.type
  //               )
  //             );
  //           })
  //         );
  //       }
  //     }
  //   }
  // }, [transaction]);

  const handleClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    // _id: string
    transaction: ITransaction | undefined
  ) => {
    setOpen(true);
    //setSelectedId(_id);
    setSelectedTransaction(transaction);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TransactionDetailModal
        open={open}
        onClose={handleClose}
        selectedTransaction={selectedTransaction}
      />
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
                <TableRow
                  hover
                  tabIndex={-1}
                  key={`${row.category}-${idx}`}
                  onClick={(e) => handleClick(e, transaction[idx])}
                >
                  {columns.map((col, idx) => {
                    const value = row[col.id];
                    return (
                      <TableCell
                        key={`${col.id}-${idx}`}
                        sx={{
                          ...dataCellStyle,
                        }}
                      >
                        {col.id === "category" ? (
                          <div className="finance-table-category">
                            <Icon
                              className="icon"
                              fontSize="medium"
                              sx={{ color: row.color }}
                            >
                              {row.icon}
                            </Icon>
                            {row.category}
                          </div>
                        ) : (
                          `${value}`
                        )}
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
