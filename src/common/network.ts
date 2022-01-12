import axios from "axios";
import logging from "config/logging";

const domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://localhost:3000";

export const FetchApiGet = async (url: any, data?: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: domain + url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        data,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    logging.info(error);
    console.error(error);
    return {
      resultCode: 404,
      errorMessage: error,
    };
  }
};

export const FetchApiPost = async (url: any, data?: any) => {
  try {
    const response = await axios({
      method: "POST",
      url: domain + url,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        data,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    logging.info(error);
    console.error(error);
    return {
      resultCode: 404,
      errorMessage: error,
    };
  }
};

export const FetchApiDelete = async (url: any, data?: any) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: domain + url,
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    logging.info(error);
    console.error(error);
    return {
      resultCode: 404,
      errorMessage: error,
    };
  }
};

export const FetchApiPut = async (url: any, data?: any) => {
  try {
    const response = await axios({
      method: "PUT",
      url: domain + url,
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    logging.info(error);
    console.error(error);
    return {
      resultCode: 404,
      errorMessage: error,
    };
  }
};
