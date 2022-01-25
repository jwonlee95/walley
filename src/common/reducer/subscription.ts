import { AnyAction } from "redux";
import { POST_NEW_RECUR_DATE, CREATE_SUBSCRIPTION_DATA } from "common/action";

export type SubscriptionDataState = {
  postNewRecurDate: any;
};
const initialState: SubscriptionDataState = {
  postNewRecurDate: undefined,
};

export const subscription = (
  state: SubscriptionDataState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case POST_NEW_RECUR_DATE:
      return {
        ...state,
        postNewRecurDate: payload.data,
      };
    case CREATE_SUBSCRIPTION_DATA:
      return {
        ...state,
        createExpenseData: payload.data,
      };
    default:
      return state;
  }
};
