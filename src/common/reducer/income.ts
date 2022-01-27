import { GET_INCOME_DATA, CREATE_INCOME_DATA } from "common/action";
import { AnyAction } from "redux";

export type IncomeDataState = {
  incomeData: object;
};

const initialState: IncomeDataState = {
  incomeData: {},
};

export const income = (
  state: IncomeDataState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case GET_INCOME_DATA:
      return {
        ...state,
        incomeData: payload.data,
      };
    case CREATE_INCOME_DATA:
      return {
        ...state,
        createExpenseData: payload.data,
      };
    default:
      return state;
  }
};
