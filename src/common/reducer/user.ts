import { GET_USER_DATA } from "common/action";
import { AnyAction } from "redux";

export type UserDataState = {
  userData: any;
};

const initialState: UserDataState = {
  userData: undefined,
};

export const user = (
  state: UserDataState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case GET_USER_DATA:
      return {
        ...state,
        userData: payload.data,
      };

    default:
      return state;
  }
};
