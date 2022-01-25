import { FetchApiGet, FetchApiPatch } from "../network";
import actions from "../creator";
import config from "config/config";
import { Config } from "firebase/auth";

const categoryPath = `${config.server.url}/api/category`;
export const GET_CATEGORY_DATA = "GET_CATEGORY_DATA";
export const GetCategory = actions(GET_CATEGORY_DATA, async () => {
  return await FetchApiGet(categoryPath);
});

export const CREATE_CATEGORY_DATA = "CREATE_CATEGORY_DATA";
export const CreateCategoryData = actions(
  CREATE_CATEGORY_DATA,
  async (id: string, data: object) => {
    await FetchApiPatch(categoryPath + `/updateExpenseCategory/${id}`, data);
    console.log(categoryPath + `/updateExpenseCategory/${id}`);
  }
);
