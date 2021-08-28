import { emailType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { store } from "react-notifications-component";

const emailReqSent = () => {
  return {
    type: emailType.EMAIL_REQUEST,
    payload: {},
  };
};

const emailReqFail = () => {
  return {
    type: emailType.EMAIL_FAIL,
    payload: {},
  };
};

const emailReqSuccess = (data?: boolean) => {
  return {
    type: emailType.EMAIL_SUCCESS,
    payload: data,
  };
};

export const requestEmailConfirm =
  (id: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(emailReqSent());
      const res = await Axios({
        url: `${api.registrationAlert}/${id}`,
        method: "GET",
      });
      dispatch(emailReqSuccess(res.data.payload.exist));
      if (res.data.payload.exist === false) {
        store.addNotification({
          title: "Выполнено!",
          message: "Регистрации прошла успешно.",
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
      }
    } catch (error) {
      dispatch(emailReqFail());
      store.addNotification({
        title: "Ошибка!",
        message: "Недействительная ссылка регистрации.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 7000,
          onScreen: true,
        },
      });
    }
  };
