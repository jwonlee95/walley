import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import { transaction, user, category, subscription } from "./reducer";

const rootReducer = combineReducers({
  transaction,
  user,
  category,
  subscription,
});

export type reducerState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};

export const store = configureStore();
