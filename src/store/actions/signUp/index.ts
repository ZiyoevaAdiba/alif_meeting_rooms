import { Dispatch } from "react";
import { History } from "history";
import { api, urls } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IUserData, signUpType } from "./interfaces";

const requestSent = () => {
  return {
    type: signUpType.SIGNUP_REQUEST,
    payload: {}
  }
}

export const requestFail = () => {
  return {
    type: signUpType.SIGNUP_FAIL,
    payload: {}
  }
}

const requestSuccess = () => {
  return {
    type: signUpType.SIGNUP_SUCCESS,
    payload: {}
  }
}

export const requestRegistration = (userData: IUserData, history: History, setSubmitting: any) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(requestSent());
    await Axios.post(`${api.signUp}`, userData);
    dispatch(requestSuccess());
    history.push(urls.login);

  } catch (error) {
    dispatch(requestFail());
    setSubmitting(false);
    console.log(error.response);
  }
}
 
export const reqDepartments = () => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(requestSent());
    await Axios.get(`${api.signUp}`);
    dispatch(requestSuccess());

  } catch (error) {
    dispatch(requestFail());
    console.log(error.response);
  }
}

