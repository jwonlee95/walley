import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Icon,
} from "@mui/material";
import moment from "moment";
import produce from "immer";
import { SetterContext, StateContext } from "contexts";
import { TransactionDetailModal } from "components";
import { ITransaction } from "interfaces/transaction";
interface Column {
  id: "category" | "date" | "description" | "amount" | "balance";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columns: readonly Column[] = [
  { id: "category", label: "Category", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "amount", label: "Amount", minWidth: 100 },
  { id: "balance", label: "Balance", minWidth: 100 },
];
export interface FinanceTableData {
  icon: string;
  color: string;
  category: string;
  date: string;
  description: string;
  amount: number;
  balance: number;
  type: string;
  _id: string;
}
export const createData = (
  icon: string,
  color: string,
  category: string,
  date: string,
  description: string,
  amount: number,
  balance: number,
  type: string,
  _id: string
): FinanceTableData => {
  return {
    icon,
    color,
    category,
    date,
    description,
    amount,
    balance,
    type,
    _id,
  };
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
  const { transaction, idToCategory, addTransaction } =
    useContext(StateContext);
  const { setAddTransaction } = useContext(SetterContext);
  const [rows, setRows] = useState<FinanceTableData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    ITransaction | undefined
  >(undefined);

  const [selectedRow, setSelectedRow] = useState<FinanceTableData | undefined>(
    undefined
  );

  useEffect(() => {
    for (const ele of transaction) {
      const _category =
        idToCategory[ele.category] === undefined
          ? { icon: "paid_money", color: "#ffd60a", name: "Income" }
          : idToCategory[ele.category];
      setRows(
        produce((draft) => {
          draft.push(
            createData(
              _category.icon,
              _category.color,
              _category.name,
              moment(ele.date).format("ll"),
              ele.description,
              ele.amount,
              0,
              ele.type,
              ele._id
            )
          );
        })
      );
    }
  }, []);

  useEffect(() => {
    if (addTransaction) {
      const newTrans = transaction[transaction.length - 1];
      // console.log(idToCategory[newTrans.category]);
      const _category =
        idToCategory[newTrans.category] === undefined
          ? { icon: "paid_money", color: "#ffd60a", name: "Income" }
          : idToCategory[newTrans.category];
      setRows(
        produce((draft) => {
          draft.push(
            createData(
              _category.icon,
              _category.color,
              _category.name,
              moment(newTrans.date).format("ll"),
              newTrans.description,
              newTrans.amount,
              0,
              newTrans.type,
              newTrans._id
            )
          );
        })
      );
    }
    return () => {
      setAddTransaction(false);
    };
  }, [addTransaction]);

  const handleRowClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    // _id: string
    transaction: ITransaction | undefined,
    row: FinanceTableData
  ) => {
    setOpen(true);
    console.log(transaction);
    setSelectedTransaction(transaction);
    setSelectedRow(row);
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
        selectedRow={selectedRow}
        setRows={setRows}
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
                  onClick={(e) => handleRowClick(e, transaction[idx], row)}
                  sx={{
                    backgroundColor: row.type === "income" ? "#83b0f32d" : "",
                    cursor: "pointer",
                  }}
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
                        ) : col.id === "amount" ? (
                          `$ ${value}`
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
