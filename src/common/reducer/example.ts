import { AnyAction } from "redux";
import { GET_EXAMPLE_DATA } from "common/action";

export type ExampleDataState = {
  exampleData: object;
};

const initialState: ExampleDataState = {
  exampleData: {},
};

export const example = (
  state: ExampleDataState = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case GET_EXAMPLE_DATA:
      return {
        ...state,
        exampleData: payload.data,
      };
    default:
      return state;
  }
};
