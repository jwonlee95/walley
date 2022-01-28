import React from "react";
import { ITransaction, ICategory, ISubscription } from "interfaces";

interface ISetterContexteProps {
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
  setTransaction: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  setSubscription: React.Dispatch<React.SetStateAction<ISubscription[]>>;
}

export const SetterContext = React.createContext<ISetterContexteProps>({
  setBalance: () => {},
  setCategory: () => {},
  setTransaction: () => {},
  setSubscription: () => {},
});
