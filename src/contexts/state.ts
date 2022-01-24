import React from "react";
import { IExpense, IIncome, ICategory, ISubscription } from "interfaces";

interface IStateContextProps {
  balance: number;
  category: ICategory[];
  expense: IExpense[];
  income: IIncome[];
  subscription: ISubscription[];
}

export const StateContext = React.createContext<IStateContextProps>({
  balance: 0,
  category: [],
  expense: [],
  income: [],
  subscription: [],
});
