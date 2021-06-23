import { emailType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";

const emailReqSent = () => {
  return {
    type: emailType.EMAIL_REQUEST,
    payload: {}
  }
}

const emailReqFail = () => {
  return {
    type: emailType.EMAIL_FAIL,
    payload: {}
  }
}

const emailReqSuccess = () => {
  return {
    type: emailType.EMAIL_SUCCESS,
    payload: {}
  }
}


export const requestEmailConfirm = () => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(emailReqSent());
    await Axios.get(`${api.registrationAlert}`);
    dispatch(emailReqSuccess());

  } catch (error) {
    dispatch(emailReqFail());
  }
}
