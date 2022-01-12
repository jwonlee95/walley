import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { expense, income } from "./reducer";

const rootReducer = combineReducers({
  expense,
  income,
});

export type reducerState = ReturnType<typeof rootReducer>;

// export const store = () => {
//   const store = createStore();
// };
