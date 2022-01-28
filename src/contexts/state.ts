import React from "react";
import { ITransaction, ICategory, ISubscription } from "interfaces";

interface IStateContextProps {
  balance: number;
  category: ICategory[];
  transaction: ITransaction[];
  subscription: ISubscription[];
}

export const StateContext = React.createContext<IStateContextProps>({
  balance: 0,
  category: [],
  transaction: [],
  subscription: [],
});
