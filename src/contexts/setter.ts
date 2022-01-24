import React from "react";
import { IExpense, IIncome, ICategory, ISubscription } from "interfaces";

interface ISetterContexteProps {
  setBalance: (balance: number) => void;
  setCategory: (category: ICategory[]) => void;
  setExpense: (expense: IExpense[]) => void;
  setIncome: (income: IIncome[]) => void;
  setSubscription: (subscription: ISubscription[]) => void;
}

export const SetterContext = React.createContext<ISetterContexteProps>({
  setBalance: () => {},
  setCategory: () => {},
  setExpense: () => {},
  setIncome: () => {},
  setSubscription: () => {},
});
