import axios from "axios";
import logging from "config/logging";

const domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://localhost:3000";

export const FetchApiGet = async (url: string, data?: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:1337",
      },
      data: {
        data,
      },
      withCredentials: true,
    });
    if (response.status !== 200) {
      throw response.data.errorMsg;
    }

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

export const FetchApiPost = async (url: string, data?: any) => {
  try {
    const response = await axios({
      method: "POST",
      url: url,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:1337",
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

export const FetchApiDelete = async (url: string, data?: any) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: domain + url,
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:1337",
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

export const FetchApiPut = async (url: string, data?: any) => {
  try {
    const response = await axios({
      method: "PUT",
      url: domain + url,
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:1337",
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

export const FetchApiPatch = async (url: string, data?: any) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: url,
      data: data,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:1337",
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
