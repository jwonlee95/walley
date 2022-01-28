import { ITransaction } from "..";

export interface IUser {
  _id: string;
  uid: string;
  name: string;
  transaction: ITransaction[];
}

export const DEFAULT_USER: IUser = {
  _id: "",
  uid: "",
  name: "",
  transaction: [],
};

export const DEFAULT_FIRE_TOKEN = "";
