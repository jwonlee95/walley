import { FetchApiGet, FetchApiPatch } from "../network";
import actions from "../creator";
import config from "config/config";

const categoryPath = `${config.server.url}/api/category`;
export const GET_CATEGORY_DATA = "GET_CATEGORY_DATA";
export const GetCategory = actions(GET_CATEGORY_DATA, async () => {
  return await FetchApiGet(categoryPath);
});

export const CREATE_CATEGORY_DATA = "CREATE_CATEGORY_DATA";
export const CreateCategoryData = actions(
  CREATE_CATEGORY_DATA,
  async (id: string, data: object) => {
    return await FetchApiPatch(categoryPath + `/create/${id}`, data);
  }
);

export const ADD_SPENT_DATA = "ADD_SPENT_DATA";
export const AddSpentData = actions(
  ADD_SPENT_DATA,
  async (id: string, data: object) => {
    await FetchApiPatch(categoryPath + `/addSpent/${id}`, data);
  }
);
