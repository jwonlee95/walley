import { FetchApiGet, FetchApiPatch, FetchApiPost } from "../network";
import actions from "../creator";
import config from "config/config";
import { Config } from "firebase/auth";

const transactionPath = `${config.server.url}/api/transaction`;

export const CREATE_TRANSACTION_DATA = "CREATE_TRANSACTION_DATA";
export const CreateTransactionData = actions(
  CREATE_TRANSACTION_DATA,
  async (id: string, data: object) => {
    return await FetchApiPost(transactionPath + `/create/${id}`, data);
  }
);

export const EDIT_TRANSACTION_DATA = "EDIT_TRANSACTION_DATA";
export const EditTransactionData = actions(
  EDIT_TRANSACTION_DATA,
  async (uid: string, tid: string, data: object) => {
    return await FetchApiPatch(transactionPath + `/edit/${uid}/${tid}`, data);
  }
);
