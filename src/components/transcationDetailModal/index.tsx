import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { CMButton, CMNumberFormat, colors, ModalCloseButton } from "components";
import { useHistory } from "react-router-dom";
import { ICategory, ITransaction } from "interfaces";
import { useDispatch, useSelector } from "react-redux";
import { reducerState } from "common/store";
import {
  CreateTransactionData,
  EditTransactionData,
  UpdateSpentData,
} from "common/action";
import { StateContext, SetterContext, UserContext } from "contexts";

interface ITransactionDetailModalProps {
  open: boolean;
  onClose: () => void;
  selectedTransaction: ITransaction | undefined;
}

export const TransactionDetailModal: React.FC<ITransactionDetailModalProps> = (
  props
) => {
  let history = useHistory();
  const { user } = useContext(UserContext).userState;
  const { category } = useContext(StateContext);
  const { setTransaction } = useContext(SetterContext);
  const dispatch = useDispatch();
  const transactionSelector = useSelector(
    (state: reducerState) => state.transaction
  );

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
    ></Dialog>
  );
};
