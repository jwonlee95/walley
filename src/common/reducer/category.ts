import { AnyAction } from "redux";
import { GET_CATEGORY_DATA } from "common/action/category";

export type CategoryDataState = {
  categoryData: any;
};

const initialState: CategoryDataState = {
  categoryData: undefined,
};

export const category = (
  state: CategoryDataState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case GET_CATEGORY_DATA:
      return {
        ...state,
        categoryData: payload.data,
      };

    default:
      return state;
  }
};
