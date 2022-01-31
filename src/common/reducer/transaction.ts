import { AnyAction } from "redux";
import {
  CREATE_TRANSACTION_DATA,
  DELETE_TRANSACTION_DATA,
  EDIT_TRANSACTION_DATA,
  GET_TRANSACTION_DATA,
} from "common/action";

export type TransactionDataState = {
  createTransactionData: any;
  editTransactionData: any;
  getTransactionData: any;
  deleteTransactionData: any;
};

const initialState: TransactionDataState = {
  createTransactionData: undefined,
  editTransactionData: undefined,
  getTransactionData: undefined,
  deleteTransactionData: undefined,
};

export const transaction = (
  state: TransactionDataState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case CREATE_TRANSACTION_DATA:
      return {
        ...state,
        createTransactionData: payload.data,
      };

    case EDIT_TRANSACTION_DATA:
      return {
        ...state,
        editTransactionData: payload.data,
      };
    case GET_TRANSACTION_DATA:
      return {
        ...state,
        editTransactionData: payload.data,
      };
    case DELETE_TRANSACTION_DATA:
      return {
        ...state,
        deleteTransactionData: payload.data,
      };
    default:
      return state;
  }
};
