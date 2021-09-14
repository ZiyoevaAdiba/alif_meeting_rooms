import { ILoginData, loginType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../routes/urls";
import { History } from "history";
import { Axios } from "../../../shared/axios";

const loginReqSent = () => {
  return {
    type: loginType.LOGIN_REQUEST,
    payload: {},
  };
};

const loginReqFail = (message?: string) => {
  return {
    type: loginType.LOGIN_FAIL,
    payload: message,
  };
};

const loginReqSuccess = (userRole?: string) => {
  return {
    type: loginType.LOGIN_SUCCESS,
    payload: userRole,
  };
};

export const loginResetError = () => {
  return {
    type: loginType.RESET_ERRORS,
    payload: {},
  };
};

export const getToken = () => {
  return localStorage.getItem("ua_fight!place") || "";
};

export const setToken = (token: string) => {
  localStorage.setItem("ua_fight!place", token);
};

export const removeToken = () => {
  localStorage.removeItem("ua_fight!place");
};

export const requestLogin =
  (
    userData: ILoginData,
    setSubmitting: (state: boolean) => void,
    history: History
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(loginReqSent());
      const res = await Axios({
        url: `${api.login}`,
        method: "POST",
        data: userData,
      });
      dispatch(loginReqSuccess(res.data.payload.user_role));
      setToken(res.data.payload.token);
      history.push(urls.reservations);
    } catch (error: any) {
      dispatch(loginReqFail(error.response));
      setSubmitting(false);
    }
  };
