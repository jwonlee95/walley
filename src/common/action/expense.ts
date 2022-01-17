import { FetchApiGet, FetchApiPost } from "../network";
import actions from "../creator";
import config from "config/config";
import { Config } from "firebase/auth";

const expensePath = `${config.server.url}/api/expense`;
export const GET_EXPENSE_DATA = "GET_EXPENSE_DATA";
export const GetExpenseData = actions(GET_EXPENSE_DATA, async () => {
  return await FetchApiGet(expensePath);
});

export const CREATE_EXPENSE_DATA = "CREATE_EXPENSE_DATA";
export const CreateExpenseData = actions(
  CREATE_EXPENSE_DATA,
  async (id: string, data: object) => {
    await FetchApiPost(expensePath + `/create/${id}`, data);
  }
);
