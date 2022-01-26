import { AnyAction } from "redux";
import {
  GET_CATEGORY_DATA,
  CREATE_CATEGORY_DATA,
} from "common/action/category";
import { ICategory } from "interfaces/category";

export type CategoryDataState = {
  categoryData: any;
  createCategoryData: ICategory | undefined;
};

const initialState: CategoryDataState = {
  categoryData: undefined,
  createCategoryData: undefined,
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

    case CREATE_CATEGORY_DATA:
      return {
        ...state,
        createCategoryData: payload.data,
      };

    default:
      return state;
  }
};