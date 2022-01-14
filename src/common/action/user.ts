import { FetchApiGet, FetchApiPost } from "../network";
import actions from "../creator";
import config from "config/config";

const userPath = `${config.server.url}/users`;
export const GET_USER_DATA = "GET_USER_DATA";
export const GetUserData = actions(GET_USER_DATA, async (id: string) => {
  return await FetchApiGet(`${userPath}/${id}`);
});
