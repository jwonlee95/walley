import { AnyAction } from "redux";
import { CREATE_TRANSACTION_DATA, EDIT_TRANSACTION_DATA } from "common/action";

export type TransactionDataState = {
  createTransactionData: any;
  editTransactionData: any;
};

const initialState: TransactionDataState = {
  createTransactionData: undefined,
  editTransactionData: undefined,
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
    default:
      return state;
  }
};
