import { FetchApiGet, FetchApiPatch } from "../network";
import actions from "../creator";
import config from "config/config";

const incomePath = `${config.server.url}/api/income`;
export const GET_INCOME_DATA = "GET_INCOME_DATA";
export const GetIncomeData = actions(GET_INCOME_DATA, async (url: string) => {
  return FetchApiGet(incomePath + url);
});

export const CREATE_INCOME_DATA = "CREATE_INCOME_DATA";
export const CreateIncomeData = actions(
  CREATE_INCOME_DATA,
  async (id: string, data: object) => {
    await FetchApiPatch(incomePath + `/updateIncome/${id}`, data);
  }
);
