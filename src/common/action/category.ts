import { FetchApiGet, FetchApiPost } from "../network";
import actions from "../creator";
import config from "config/config";
import { Config } from "firebase/auth";

const categoryPath = `${config.server.url}/api/types`;
export const GET_CATEGORY_DATA = "GET_CATEGORY_DATA";
export const GetCategory = actions(GET_CATEGORY_DATA, async () => {
  return await FetchApiGet(categoryPath);
});
