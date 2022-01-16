import { AnyAction } from "redux";
import { GET_EXPENSE_DATA, CREATE_EXPENSE_DATA } from "common/action";

export type ExpenseDataState = {
  expenseData: any;
  createExpenseData: any;
};

const initialState: ExpenseDataState = {
  expenseData: undefined,
  createExpenseData: undefined,
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

    case CREATE_EXPENSE_DATA:
      return {
        ...state,
        createExpenseData: payload.data,
      };
    default:
      return state;
  }
};
