import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../../store";
import { axiosErrorCatch } from "../../store/actions/errorHandler";
import { getToken } from "../../store/actions/login";

export const Axios = axios.create();

Axios.interceptors.request.use(
  (config) => {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}${config.url}`

    const token = getToken();

    const updatedConfig = {
      ...config,
      url: baseUrl,
      headers: token && {
        Authorization: `Bearer ${token}`,
      },
    };

    return updatedConfig;
  },
  (error) => {
    store.dispatch(axiosErrorCatch());
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if ((error.response?.status || 0) >= 500 || error.response === undefined) {
      store.dispatch(axiosErrorCatch());
    }
    return Promise.reject(error)
  }
);
