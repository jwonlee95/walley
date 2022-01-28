import { FetchApiPatch, FetchApiPost } from "common/network";
import actions from "../creator";
import config from "config/config";

const subscriptionPath = `${config.server.url}/api/subscription`;

export const CREATE_SUBSCRIPTION_DATA = "CREATE_SUBSCRIPTION_DATA";
export const CreateSubscriptionData = actions(
  CREATE_SUBSCRIPTION_DATA,
  async (id: string, data: object) => {
    return await FetchApiPatch(subscriptionPath + `/create/${id}`, data);
  }
);

export const POST_NEW_RECUR_DATE = "POST_NEW_RECUR_DATE";
export const PostNewRecurDate = actions(
  POST_NEW_RECUR_DATE,
  async (url: string, data: any) => {
    return await FetchApiPost(subscriptionPath + url, data);
  }
);
