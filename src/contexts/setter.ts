import React from "react";
import {
  ITransaction,
  ICategory,
  ISubscription,
  IIdToCategory,
} from "interfaces";

interface ISetterContexteProps {
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>;
  setTransaction: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  setSubscription: React.Dispatch<React.SetStateAction<ISubscription[]>>;
  setIdToCategory: React.Dispatch<React.SetStateAction<IIdToCategory>>;
  setAddTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SetterContext = React.createContext<ISetterContexteProps>({
  setBalance: () => {},
  setCategory: () => {},
  setTransaction: () => {},
  setSubscription: () => {},
  setIdToCategory: () => {},
  setAddTransaction: () => {},
});
