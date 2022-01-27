import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Popover,
  TextField,
} from "@mui/material";
import {
  CMButton,
  CMNumberFormat,
  CMRadioGroup,
  colors,
  ModalCloseButton,
  PlusButton,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "common/store";
import { CreateSubscriptionData } from "common/action";
import { SetterContext, UserContext } from "contexts";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
interface ISubscriptionModalProps {
  open: boolean;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<ISubscriptionModalProps> = (props) => {
  const { user } = useContext(UserContext).userState;
  const { setSubscription } = useContext(SetterContext);
  const dispatch = useDispatch();
  const subscriptionSelector = useSelector(
    (state: reducerState) => state.subscription
  );

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [recurDate, setRecurDate] = React.useState<Date | null>(new Date());
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);
  const [isAmountEmpty, setIsAmountEmpty] = useState<boolean>(false);
  const [isRecurDateEmpty, setIsRecurDateEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (!props.open) {
      setTimeout(() => {
        setName("");
        setAmount("");
        setRecurDate(null);
      }, 500);
    }
  }, [props.open]);

  useEffect(() => {
    if (isNameEmpty) {
      setIsNameEmpty(false);
    }
  }, [name]);
  useEffect(() => {
    if (isAmountEmpty) {
      setIsAmountEmpty(false);
    }
  }, [amount]);
  useEffect(() => {
    if (isRecurDateEmpty) {
      setIsRecurDateEmpty(false);
    }
  }, [recurDate]);
  useEffect(() => {
    if (subscriptionSelector.createSubscriptionData) {
      // setSubscription(
      //   produce((draft) => {
      //     draft.push(subscriptionSelector.createSubscriptionData);
      //   })
      // );
    }
  }, [subscriptionSelector.createSubscriptionData]);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleChangeRecurDate = (newValue: Date | null) => {
    setRecurDate(newValue);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const handleSaveSubscription = () => {
    if (name === "" || amount === "" || recurDate === null) {
      if (name === "") {
        setIsNameEmpty(true);
      }
      if (amount === "") {
        setIsAmountEmpty(true);
      }
      if (recurDate === null) {
        setIsRecurDateEmpty(true);
      }
      return;
    }
    props.onClose();
    //Api
    const _amount = parseFloat(amount.slice(4).replace(/,/g, ""));
    const data = {
      name: name,
      amount: _amount,
      recurDate: recurDate,
    };

    dispatch(CreateSubscriptionData(user._id, data));
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
        <div className="add-modal-title">Add Subscription</div>
        <ModalCloseButton onClose={props.onClose} />
      </DialogTitle>
      <DialogContent>
        <div className="dialog-content">
          <TextField
            autoComplete="off"
            error={isNameEmpty}
            id="modal-textfield"
            required
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={handleChangeName}
          />
          <CMNumberFormat
            label="Amount"
            error={isAmountEmpty}
            value={amount}
            onChange={handleChangeAmount}
          />
          {
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Recur Date"
                value={recurDate}
                onChange={handleChangeRecurDate}
                inputFormat="MM/dd/yyyy"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          }
          <div className="modal-content-comp btns-wrapper flex">
            <CMButton
              text="Save"
              bgcolor="#28B463"
              width={120}
              height={37.5}
              mr="10px"
              onClick={handleSaveSubscription}
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
