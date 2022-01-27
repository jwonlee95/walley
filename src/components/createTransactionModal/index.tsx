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
import { Link, useHistory } from "react-router-dom";
import { ICategory } from "interfaces";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "common/store";
import { GetTypes, CreateExpenseData, AddSpentData } from "common/action";
import { SetterContext, UserContext } from "contexts";

interface ICreateTransactionModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateTransactionModal: React.FC<ICreateTransactionModalProps> = (
  props
) => {
  let history = useHistory();
  const { user } = useContext(UserContext).userState;
  const { setExpense } = useContext(SetterContext);
  const dispatch = useDispatch();
  const expenseSelector = useSelector((state: reducerState) => state.expense);
  const userSelector = useSelector((state: reducerState) => state.user);
  const [types, setTypes] = useState<ICategory[]>([]);
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [isCategoryEmpty, setIsCategoryEmpty] = useState<boolean>(false);
  const [isAmountEmpty, setIsAmountEmpty] = useState<boolean>(false);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setCategory("");
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
      console.log(userSelector.userTypes);
      let _types = userSelector.userTypes.category as ICategory[];
      setTypes(_types);
      // console.log("types are ", _types);
    }
  }, [userSelector.userTypes]);

  useEffect(() => {
    if (isCategoryEmpty) {
      setIsCategoryEmpty(false);
    }
  }, [category]);
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
    setCategory(newCategory);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePlusButtonClick = () => {
    history.push("/excategory");
  };

  const handleSaveTransaction = () => {
    if (category === "" || amount === "" || description === null) {
      if (category === "") {
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
      category: category,
      amount: _amount,
      description: description,
    };

    dispatch(CreateExpenseData(user._id, data));
  };

  const handleAddSpent = () => {
    const _amount = parseFloat(amount.slice(4).replace(/,/g, ""));
    const dataSpent = {
      name: category,
      spent: _amount,
    };
    dispatch(AddSpentData(user._id, dataSpent));
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
          <ToggleButtonGroup
            value={category}
            id="category"
            exclusive
            onChange={handleChangeCategory}
          >
            {types.map((category, idx) => {
              return (
                <ToggleButton
                  value={category.name}
                  key={`${category.name}-${idx}`}
                >
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
