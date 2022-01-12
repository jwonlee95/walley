import { AnyAction } from "redux";
import { GET_EXPENSE_DATA } from "common/action";

export type ExpenseDataState = {
  expenseData: object;
};

const initialState: ExpenseDataState = {
  expenseData: {},
};

export const expense = (
  state: ExpenseDataState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case GET_EXPENSE_DATA:
      return {
        ...state,
        expenseData: payload.data,
      };
    default:
      return state;
  }
};
