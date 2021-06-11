import { ILoginData, loginType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../routes/urls";
import { IForgetData } from "../forget/interfaces";
import { History } from "history";
import { Axios } from "../../../shared/axios";

const loginReqSent = () => {
  return {
    type: loginType.LOGIN_REQUEST,
    payload: {}
  }
}

const loginReqFail = () => {
  return {
    type: loginType.LOGIN_FAIL,
    payload: {}
  }
}

const loginReqSuccess = (userRole?: string) => {
  return {
    type: loginType.LOGIN_SUCCESS,
    payload: userRole
  }
}

export const getToken = () => {
  return localStorage.getItem('token') || '';
} 

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
} 

export const removeToken = () => {
  localStorage.removeItem('token');
}


export const requestLogin = (userData: ILoginData, setSubmitting: any, history: History) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(loginReqSent());
    const res = await Axios.post(`${api.login}`, userData);
    dispatch(loginReqSuccess(res.data.payload.user_role));
    setToken(res.data.payload.token);
    history.push(urls.reservations);

  } catch (error) {
    dispatch(loginReqFail());
    setSubmitting(false);
    alert(error.response.data.payload.message);
  }
}

export const requestPassword = (userData: IForgetData, setSubmitting: any) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(loginReqSent());
    await Axios.post(`${api.forget}`, userData);
    dispatch(loginReqSuccess());
    alert('новый пароль был отправлен, проверьте почту')

  } catch (error) {
    dispatch(loginReqFail());
    setSubmitting(false);
    alert(error.response.data.payload.message);
  }
}