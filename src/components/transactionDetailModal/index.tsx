import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Icon,
  IconButton,
  Card,
  Popover,
  Paper,
  Stack,
} from "@mui/material";
import {
  CMButton,
  CMNumberFormat,
  colors,
  createData,
  EditButton,
  ModalCloseButton,
  FinanceTableData,
} from "components";
import { useHistory } from "react-router-dom";
import { ICategory, ITransaction } from "interfaces";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "common/store";
import {
  CreateTransactionData,
  DeleteTransactionData,
  EditTransactionData,
  UpdateSpentData,
} from "common/action";
import { StateContext, SetterContext, UserContext } from "contexts";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import produce from "immer";
import moment from "moment";

interface ITransactionDetailModalProps {
  open: boolean;
  onClose: () => void;
  selectedTransaction: ITransaction | undefined;
  selectedRow: FinanceTableData | undefined;
  setRows: React.Dispatch<React.SetStateAction<FinanceTableData[]>>;
}

export const TransactionDetailModal: React.FC<ITransactionDetailModalProps> = ({
  selectedTransaction,
  selectedRow,
  setRows,
  ...props
}) => {
  let history = useHistory();
  // const transType = selectedTransaction.type;
  const { user } = useContext(UserContext).userState;
  const { category, idToCategory, transaction } = useContext(StateContext);
  const { setTransaction } = useContext(SetterContext);
  const dispatch = useDispatch();
  const transactionSelector = useSelector(
    (state: reducerState) => state.transaction
  );

  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState<string>("");

  const [memo, setMemo] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(undefined);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const openPopover = Boolean(anchorEl);

  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState<boolean>(false);
  const [isAmountEmpty, setIsAmountEmpty] = useState<boolean>(false);
  const [isDateEmpty, setIsDateEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (props.open && selectedRow && selectedTransaction) {
      setDescription(selectedRow.description);
      setDate(selectedTransaction.date);
      setAmount(`USD ${selectedTransaction.amount.toString()}`);
      setMemo(selectedTransaction.memo);
      console.log(selectedTransaction);
      setSelectedCategory(idToCategory[selectedTransaction.category]);
    }
    if (!props.open) {
      setTimeout(() => {
        setIsEdit(false);
        setSelectedCategory(undefined);
      }, 500);
    }
  }, [props.open]);

  useEffect(() => {
    if (isDescriptionEmpty) {
      setIsDescriptionEmpty(false);
    }
  }, [description]);

  useEffect(() => {
    if (isDateEmpty) {
      setIsDateEmpty(false);
    }
  }, [date]);

  useEffect(() => {
    if (isAmountEmpty) {
      setIsAmountEmpty(false);
    }
  }, [amount]);

  useEffect(() => {
    if (transactionSelector.editTransactionData) {
      setTransaction(
        produce((draft) => {
          const index = draft.findIndex(
            (tran) => tran._id === transactionSelector.editTransactionData._id
          );
          if (index !== -1) {
            draft[index] = transactionSelector.editTransactionData;
          }
        })
      );
      const _category =
        idToCategory[transactionSelector.editTransactionData.category] ===
        undefined
          ? { icon: "paid_money", color: "#ffd60a", name: "Income" }
          : idToCategory[transactionSelector.editTransactionData.category];
      const _id = transactionSelector.editTransactionData._id;
      console.log(transactionSelector.editTransactionData.amount);
      setRows(
        produce((draft) => {
          const index = draft.findIndex((row) => _id === row._id);
          draft[index] = createData(
            _category.icon,
            _category.color,
            _category.name,
            moment(transactionSelector.editTransactionData.date).format("ll"),
            transactionSelector.editTransactionData.description,
            transactionSelector.editTransactionData.amount,
            0,
            transactionSelector.editTransactionData.type,
            _id
          );
        })
      );
    }
  }, [transactionSelector.editTransactionData]);

  useEffect(() => {
    if (transactionSelector.deleteTransactionData) {
      const deletedId = transactionSelector.deleteTransactionData;
      setTransaction(
        produce((draft) => {
          const index = draft.findIndex((trans) => trans._id === deletedId);
          if (index !== -1) draft.splice(index, 1);
        })
      );
      setRows(
        produce((draft) => {
          const index = draft.findIndex((row) => row._id === deletedId);
          if (index !== -1) draft.splice(index, 1);
        })
      );
      props.onClose();
    }
  }, [transactionSelector.deleteTransactionData]);

  const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEdit(true);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleClickIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isEdit) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSelectCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: ICategory
  ) => {
    setAnchorEl(null);
    setSelectedCategory(category);
  };

  const handleChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const handleClickSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (description === "" || date === null || amount === "") {
      setIsDescriptionEmpty(description === "");
      setIsDateEmpty(date == null);
      setIsAmountEmpty(amount === "");
      return;
    }
    // API
    const _amount = parseFloat(amount.slice(4).replace(/,/g, ""));
    if (selectedTransaction) {
      if (selectedTransaction.type === "expense" && selectedCategory) {
        const data = {
          category: selectedCategory.name,
          amount: _amount,
          description: description,
          type: selectedTransaction.type,
          memo: memo,
          date: date,
        };
        dispatch(EditTransactionData(user._id, selectedTransaction._id, data));
      } else {
        const data = {
          category: "",
          amount: _amount,
          description: description,
          type: selectedTransaction.type,
          memo: memo,
          date: date,
        };
        dispatch(EditTransactionData(user._id, selectedTransaction._id, data));
      }
    }
    props.onClose();
  };

  const handleDeleteTransaction = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedTransaction) {
      dispatch(DeleteTransactionData(user._id, selectedTransaction._id));
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="atransaction-detail-title"
      aria-describedby="transaction-detail-desc"
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <DialogTitle id="transaction-detail-title">
        <div className="modal-title flex justify align capitalize">
          {selectedTransaction && selectedTransaction.type}
          <EditButton fontSize={20} ml={1} onClick={handleClickEdit} />
          <ModalCloseButton onClose={props.onClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="dialog-content">
          <TextField
            autoComplete="off"
            error={isDescriptionEmpty}
            id="modal-textfield"
            required
            label="Description"
            variant="standard"
            fullWidth
            value={description}
            onChange={handleChangeDescription}
            inputProps={{ readOnly: !isEdit }}
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              value={date}
              onChange={handleChangeDate}
              inputFormat="MM/dd/yyyy"
              readOnly={!isEdit}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={isDateEmpty}
                  autoComplete="off"
                />
              )}
            />
          </LocalizationProvider>
          <CMNumberFormat
            label="Amount"
            readonly={!isEdit}
            // error={isAmountEmpty}
            value={amount}
            onChange={handleChangeAmount}
            sx={{ mb: 1, mt: 1 }}
          />
          {selectedTransaction && selectedTransaction.type === "expense" ? (
            <div className="modal-content-comp wrap">
              <div className="content-title small">Category</div>
              <Card
                variant="outlined"
                className="cm-card"
                sx={{
                  height: "68px",
                }}
              >
                <Icon
                  onClick={handleClickIcon}
                  sx={{
                    ml: 1,
                    cursor: isEdit ? "pointer" : "auto",
                    fontSize: "50px",
                    color: selectedCategory?.color,
                  }}
                >
                  {selectedCategory?.icon}
                </Icon>
                <Popover
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                >
                  <Paper variant="elevation" sx={{ p: 2, maxWidth: "250px" }}>
                    <Stack
                      direction="row"
                      flexWrap="wrap"
                      justifyContent="space-evenly"
                    >
                      {category.map((ele, idx) => {
                        return (
                          <Stack
                            alignItems="center"
                            key={`stack-row-${ele.name}-${idx}`}
                          >
                            {/* FIXME: It needs to pass object id, not name */}
                            <IconButton
                              onClick={(e) => handleSelectCategory(e, ele)}
                            >
                              <Icon sx={{ color: ele.color, fontSize: "30px" }}>
                                {ele.icon}
                              </Icon>
                            </IconButton>
                            <div className="popover-icon-name">{ele.name}</div>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Paper>
                </Popover>
              </Card>
            </div>
          ) : (
            <></>
          )}

          <div className="modal-content-comp">
            <div className="content-title small">Memo</div>
            <TextField
              autoComplete="off"
              variant="outlined"
              id="modal-textfield"
              fullWidth
              multiline
              inputProps={{
                style: {
                  height: "70px",
                  fontSize: "14px",
                },
                readOnly: !isEdit,
              }}
              value={memo}
              onChange={handleChangeMemo}
            />
          </div>
          <div className="modal-content-comp btns-wrapper flex">
            <CMButton
              animation={isEdit}
              text={isEdit ? "Save" : "Cancel"}
              bgcolor={isEdit ? "#28B463" : "rgb(255, 255, 255)"}
              border={isEdit ? "" : `1px solid ${colors["gray"]}`}
              color={isEdit ? "" : colors["gray"]}
              width={90}
              height={37.5}
              mr={1}
              onClick={isEdit ? handleClickSave : props.onClose}
            />
            <CMButton
              text={`Delete ${selectedTransaction?.type}`}
              bgcolor="rgba(235, 87, 87, 0.1)"
              border={`1px solid ${colors["red"]}`}
              color={colors["red"]}
              width={150}
              onClick={handleDeleteTransaction}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
