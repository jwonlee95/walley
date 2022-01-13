import { FetchApiGet } from "../network";
import actions from "../creator";
import config from "config/config";

const examplePath = `${config.server.url}/api/example`;
export const GET_EXAMPLE_DATA = "GET_EXAMPLE_DATA";
export const GetExampleData = actions(GET_EXAMPLE_DATA, async (url: string) => {
  return FetchApiGet(examplePath + url);
});
