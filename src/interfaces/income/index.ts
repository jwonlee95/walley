import { IUser } from "../user";

export interface IIncome {
  _id: string;
  category: string;
  user: string | IUser;
  description?: string;
  amount: string;
  balance: string;
  createdAt: string;
  updatedAt: string;
}
