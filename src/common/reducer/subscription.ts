import { AnyAction } from "redux";
import { POST_NEW_RECUR_DATE } from "common/action";

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
    default:
      return state;
  }
};
