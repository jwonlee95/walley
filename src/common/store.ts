import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { expense, income, example } from "./reducer";

const rootReducer = combineReducers({
  expense,
  income,
  example,
});

export type reducerState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};

export const store = configureStore();
