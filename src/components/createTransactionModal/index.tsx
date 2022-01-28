import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButtonGroup,
  Card,
  Icon,
  Popover,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import {
  CMButton,
  CMNumberFormat,
  CMToggleButton,
  colors,
  ModalCloseButton,
  PlusButton,
} from "components";
import { useHistory } from "react-router-dom";
import { ICategory } from "interfaces";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "common/store";
import { CreateTransactionData, AddSpentData } from "common/action";
import { SetterContext, StateContext, UserContext } from "contexts";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import produce from "immer";

export interface ICreateTransactionModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateTransactionModal: React.FC<ICreateTransactionModalProps> = (
  props
) => {
  const [type, setType] = useState<string>("expense");
  const handleChangeType = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setType(newType);
  };

  const { user } = useContext(UserContext).userState;
  const { setTransaction, setAddTransaction } = useContext(SetterContext);
  const { category } = useContext(StateContext);
  const dispatch = useDispatch();
  const transactionSelector = useSelector(
    (state: reducerState) => state.transaction
  );
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [memo, setMemo] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openPopover = Boolean(anchorEl);

  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState<boolean>(false);
  const [isDateEmpty, setIsDateEmpty] = useState<boolean>(false);
  const [isAmountEmpty, setIsAmountEmpty] = useState<boolean>(false);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setDescription("");
        setDate(null);
        setAmount("");
        setSelectedCategory(null);
        setMemo("");
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
    if (isCategoryEmpty) {
      setIsCategoryEmpty(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    setDescription("");
    setDate(null);
    setAmount("");
    setSelectedCategory(null);
    setMemo("");
  }, [type]);

  useEffect(() => {
    if (transactionSelector.createTransactionData) {
      setTransaction(
        produce((draft) => {
          draft.push(transactionSelector.createTransactionData);
          setAddTransaction(true);
        })
      );
    }
  }, [transactionSelector.createTransactionData]);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue);
  };

  const handleClickIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  /* FIXME: It needs to get object id, not name */
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

  const handleSaveTransaction = () => {
    if (
      description === "" ||
      date === null ||
      amount === "" ||
      (selectedCategory === null && type === "expense")
    ) {
      if (description === "") {
        setIsDescriptionEmpty(true);
      }
      if (date === null) {
        setIsDateEmpty(true);
      }
      if (amount === "") {
        setIsAmountEmpty(true);
      }
      if (selectedCategory === null && type === "expense") {
        setIsCategoryEmpty(true);
      }
      return;
    }
    //Api

    //FIXME: category: should pass object_id
    const _amount = parseFloat(amount.slice(4).replace(/,/g, ""));
    const data = {
      category: selectedCategory ? selectedCategory.name : "",
      amount: _amount,
      description: description,
      type: type,
      memo: memo,
      date: date,
    };
    dispatch(CreateTransactionData(user._id, data));
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="add-subscription-modal-title"
      aria-describedby="add-subscription-modal-desc"
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <DialogTitle id="add-subscription-modal-title">
        <div className="add-modal-title">Add Transaction</div>
        <ModalCloseButton onClose={props.onClose} />
      </DialogTitle>
      <DialogContent>
        <div className="dialog-content">
          <Card
            variant="outlined"
            className="cm-card"
            sx={{ height: "50px", justifyContent: "center" }}
          >
            <ToggleButtonGroup
              color="primary"
              value={type}
              onChange={handleChangeType}
              exclusive
            >
              <CMToggleButton
                value="expense"
                sx={{
                  height: "30px",
                  width: "130px",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                }}
                disableRipple
              >
                Expense
              </CMToggleButton>
              <CMToggleButton
                value="income"
                sx={{
                  height: "30px",
                  width: "130px",
                  textTransform: "none",
                }}
                disableRipple
              >
                Income
              </CMToggleButton>
            </ToggleButtonGroup>
          </Card>
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
            sx={{ mb: 3 }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date"
              value={date}
              onChange={handleChangeDate}
              inputFormat="MM/dd/yyyy"
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
            error={isAmountEmpty}
            value={amount}
            onChange={handleChangeAmount}
            sx={{ mb: 1, mt: 1 }}
          />
          {type === "expense" ? (
            <div className="modal-content-comp wrap">
              <div
                className={
                  isCategoryEmpty
                    ? `content-title small red`
                    : `content-title small`
                }
              >
                Category
              </div>
              <Card
                variant="outlined"
                className="cm-card"
                sx={{
                  height: "68px",
                  border: isCategoryEmpty ? `1px solid ${colors["red"]}` : "",
                }}
              >
                {selectedCategory ? (
                  <Icon
                    onClick={handleClickIcon}
                    sx={{
                      ml: 1,
                      cursor: "pointer",
                      fontSize: "50px",
                      color: selectedCategory.color,
                    }}
                  >
                    {selectedCategory.icon}
                  </Icon>
                ) : (
                  <PlusButton fontSize="50px" onClick={handleClickIcon} />
                )}
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
                    {category.map((ele, idx) => {
                      return (
                        <Stack
                          direction="row"
                          flexWrap="wrap"
                          justifyContent="space-evenly"
                          key={`stack-row-${ele.name}-${idx}`}
                        >
                          <Stack alignItems="center">
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
                        </Stack>
                      );
                    })}
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
              }}
              value={memo}
              onChange={handleChangeMemo}
            />
          </div>
          <div className="modal-content-comp btns-wrapper flex">
            <CMButton
              text="Save"
              bgcolor="#28B463"
              width={120}
              height={37.5}
              mr="10px"
              onClick={handleSaveTransaction}
            />

            <CMButton
              text="Cancel"
              bgcolor="rgba(235, 87, 87, 0.1)"
              border={`1px solid ${colors["red"]}`}
              color={colors["red"]}
              width={120}
              onClick={props.onClose}
            />
          </div>
          {/* {type === "expense" ? (
            <ExpenseTab {...props} />
          ) : (
            <IncomeTab {...props} />
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
