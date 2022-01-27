import React from "react";
import { IExpense, IIncome, ICategory, ISubscription } from "interfaces";

interface ISetterContexteProps {
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
  setExpense: React.Dispatch<React.SetStateAction<IExpense[]>>;
  setIncome: React.Dispatch<React.SetStateAction<IIncome[]>>;
  setSubscription: React.Dispatch<React.SetStateAction<ISubscription[]>>;
}

export const SetterContext = React.createContext<ISetterContexteProps>({
  setBalance: () => {},
  setCategory: () => {},
  setExpense: () => {},
  setIncome: () => {},
  setSubscription: () => {},
});
