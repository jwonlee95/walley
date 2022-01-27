import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  CMButton,
  CMNumberFormat,
  colors,
  ModalCloseButton,
  PlusButton,
} from "components";
import { useHistory } from "react-router-dom";
import { ICategory, IExpense } from "interfaces";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "common/store";
import {
  GetTypes,
  EditExpenseData,
  AddSpentData,
  ReadCategoryData,
  UpdateSpentData,
} from "common/action";
import { StateContext, SetterContext, UserContext } from "contexts";

interface ITransactionDetailModalProps {
  open: boolean;
  onClose: () => void;
  selectedExpense: IExpense | undefined;
}

export const TransactionDetailModal: React.FC<ITransactionDetailModalProps> = (
  props
) => {
  let history = useHistory();
  const { user } = useContext(UserContext).userState;
  const { category } = useContext(StateContext);
  const { setExpense } = useContext(SetterContext);
  const dispatch = useDispatch();
  const expenseSelector = useSelector((state: reducerState) => state.expense);
  const userSelector = useSelector((state: reducerState) => state.user);
  const [oldCategorySpent, setOldCategorySpent] = useState<number>();
  const [types, setTypes] = useState<ICategory[]>([]);
  const [oldCategoryName, setOldCategoryName] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [oldAmount, setOldAmount] = useState<number>();
  const [description, setDescription] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isCategoryEmpty, setIsCategoryEmpty] = useState<boolean>(false);
  const [isAmountEmpty, setIsAmountEmpty] = useState<boolean>(false);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState<boolean>(false);
  const expense = props.selectedExpense;

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setNewCategory("");
        setAmount("");
        setDescription("");
      }, 500);
    }
  }, [props.open]);

  useEffect(() => {
    dispatch(GetTypes(user._id));
  }, []);

  useEffect(() => {
    if (userSelector.userTypes) {
      let _types = userSelector.userTypes.category as ICategory[];
      setTypes(_types);
    }
  }, [userSelector.userTypes]);

  useEffect(() => {
    if (isCategoryEmpty) {
      setIsCategoryEmpty(false);
    }
  }, [newCategory]);
  useEffect(() => {
    if (isAmountEmpty) {
      setIsAmountEmpty(false);
    }
  }, [amount]);
  useEffect(() => {
    if (isDescriptionEmpty) {
      setIsDescriptionEmpty(false);
    }
  }, [description]);
  useEffect(() => {
    if (expenseSelector.createExpenseData) {
    }
  }, [expenseSelector.createExpenseData]);

  const handleChangeCategory = (
    event: React.MouseEvent<HTMLElement>,
    newCategory: string
  ) => {
    setNewCategory(newCategory);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setOldAmount(expense?.amount);
    for (const cate of category) {
      if (cate.name === expense?.category) {
        setOldCategorySpent(cate.spent);
        setOldCategoryName(cate.name);
      }
    }
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePlusButtonClick = () => {
    history.push("/excategory");
  };

  const openPopover = Boolean(anchorEl);

  const handleSaveTransaction = () => {
    if (newCategory === "" || amount === "" || description === null) {
      if (newCategory === "") {
        setIsCategoryEmpty(true);
      }
      if (amount === "") {
        setIsAmountEmpty(true);
      }
      if (description === null) {
        setIsDescriptionEmpty(true);
      }
      return;
    }
    props.onClose();
    //Api
    const _amount = parseFloat(amount.slice(4).replace(/,/g, ""));
    const data = {
      category: newCategory,
      amount: _amount,
      description: description,
    };

    dispatch(EditExpenseData(user._id, expense?._id, data));
  };

  const handleAddSpent = () => {
    const _amount = parseFloat(amount.slice(4).replace(/,/g, ""));
    const dataSpent = {
      name: newCategory,
      spent: _amount,
      oldSpent: oldCategorySpent,
      oldAmount: oldAmount,
      oldName: oldCategoryName,
    };
    dispatch(UpdateSpentData(user._id, dataSpent));
  };

  const handleOnClick = () => {
    handleSaveTransaction();
    handleAddSpent();
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
          <PlusButton onClick={handlePlusButtonClick} />
          {/* <Link to="/excategory">Add Category</Link> */}
          <ToggleButtonGroup
            value={newCategory}
            id="category"
            exclusive
            onChange={handleChangeCategory}
          >
            {types.map((category) => {
              return (
                <ToggleButton value={category.name}>
                  {category.name}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
          <CMNumberFormat
            label="Amount"
            error={isAmountEmpty}
            value={amount}
            onChange={handleChangeAmount}
          />
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
          />
          <div className="modal-content-comp btns-wrapper flex">
            <CMButton
              text="Save"
              bgcolor="#28B463"
              width={120}
              height={37.5}
              mr="10px"
              onClick={handleOnClick}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
