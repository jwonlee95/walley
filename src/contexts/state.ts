import React from "react";
import {
  ITransaction,
  ICategory,
  ISubscription,
  IIdToCategory,
} from "interfaces";

interface IStateContextProps {
  balance: number;
  category: ICategory[];
  transaction: ITransaction[];
  subscription: ISubscription[];
  idToCategory: IIdToCategory;
  addTransaction: boolean;
}

export const StateContext = React.createContext<IStateContextProps>({
  balance: 0,
  category: [],
  transaction: [],
  subscription: [],
  idToCategory: {},
  addTransaction: false,
});
