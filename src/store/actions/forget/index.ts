import { IForgetData, forgetType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../routes/urls";
import { History } from "history";
import { Axios } from "../../../shared/axios";
import { store } from "react-notifications-component";

const forgetReqSent = () => {
  return {
    type: forgetType.FORGET_REQUEST,
    payload: {},
  };
};

const forgetReqFail = (message?: string) => {
  return {
    type: forgetType.FORGET_FAIL,
    payload: message,
  };
};

const forgetReqSuccess = (userRole?: string) => {
  return {
    type: forgetType.FORGET_SUCCESS,
    payload: userRole,
  };
};

export const forgetResetError = () => {
  return {
    type: forgetType.RESET_ERRORS,
    payload: {},
  };
};

export const requestPassword =
  (
    userData: IForgetData,
    setSubmitting: (state: boolean) => void,
    history: History
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(forgetReqSent());
      await Axios({
        url: `${api.forget}`,
        method: "POST",
        data: userData,
      });
      dispatch(forgetReqSuccess());
      store.addNotification({
        title: "Успешно!",
        message: "Новый пароль был отправлен, проверьте почту",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 7000,
          onScreen: true,
        },
      });
      history.push(urls.login);
    } catch (error: any) {
      dispatch(forgetReqFail(error.response.data.payload.message));
      setSubmitting(false);
    }
  };
