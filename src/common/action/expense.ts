import { FetchApiGet } from "../network";
import actions from "../creator";
import config from "config/config";
import { Config } from "firebase/auth";

const expensePath = `${config.server.url}/api/expense/`;
export const GET_EXPENSE_DATA = "GET_EXPENSE_DATA";
export const GetExpenseData = actions(GET_EXPENSE_DATA, async (url: string) => {
  return FetchApiGet(expensePath + url);
});
