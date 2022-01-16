import { GET_USER_DATA, GET_TYPES } from "common/action";
import { AnyAction } from "redux";

export type UserDataState = {
  userData: any;
  userTypes: any;
};

const initialState: UserDataState = {
  userData: undefined,
  userTypes: undefined,
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
    case GET_TYPES:
      return {
        ...state,
        userTypes: payload.data,
      };
    default:
      return state;
  }
};
