import { Dispatch } from "react";
import { History } from "history";
import { api, urls } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IUserData, signUpType } from "./interfaces";
import { store } from "react-notifications-component";

const requestSent = () => {
  return {
    type: signUpType.SIGNUP_REQUEST,
    payload: {}
  }
}

export const requestFail = (message: string) => {
  return {
    type: signUpType.SIGNUP_FAIL,
    payload: message
  }
}

const requestSuccess = () => {
  return {
    type: signUpType.SIGNUP_SUCCESS,
    payload: {}
  }
}

export const requestRegistration = (
  userData: IUserData, 
  history: History, 
  setSubmitting: (state: boolean) => void
  ) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(requestSent());
    
    await Axios.post(`${api.signUp}`, userData);
    
    dispatch(requestSuccess());
    history.push(urls.login);
    
    store.addNotification({
      title: "Добавлен!",
      message: "Для продолжения регистрации подтвердите почту",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 7000,
        onScreen: true
      }
    });

  } catch (error) {
    dispatch(requestFail(error.response.data.payload.message));
    setSubmitting(false);
  }
}


