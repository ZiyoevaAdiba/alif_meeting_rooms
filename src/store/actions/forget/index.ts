import { IForgetData, forgetType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../routes/urls";
import { History } from "history";
import { Axios } from "../../../shared/axios";

const forgetReqSent = () => {
  return {
    type: forgetType.FORGET_REQUEST,
    payload: {}
  }
}

const forgetReqFail = (message?: string) => {
  return {
    type: forgetType.FORGET_FAIL,
    payload: message
  }
}

const forgetReqSuccess = (userRole?: string) => {
  return {
    type: forgetType.FORGET_SUCCESS,
    payload: userRole
  }
}

export const requestPassword = (userData: IForgetData, setSubmitting: any, history: History) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(forgetReqSent());
    await Axios.post(`${api.forget}`, userData);
    dispatch(forgetReqSuccess());
    alert('новый пароль был отправлен, проверьте почту');
    history.push(urls.login);


  } catch (error) {
    dispatch(forgetReqFail(error.response.data.payload.message));
    setSubmitting(false);
  }
}