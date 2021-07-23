import { getUserDataType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../../routes/urls";
import { Axios } from "../../../../shared/axios";
import { IUserData } from "../../signUp/interfaces";
import { store } from "react-notifications-component";
import { IGetUserData } from "../../../reducers/reservations/userData/interfaces";
import { History } from "history";

const getUserInfoReq = () => {
  return {
    type: getUserDataType.GET_USERS_INFO,
    payload: {}
  }
}

const getUserInfoFail = () => {
  return {
    type: getUserDataType.GET_USERS_INFO_FAIL,
    payload: {}
  }
}

const getUserInfoSuccess = (data?: IUserData) => {
  return {
    type: getUserDataType.GET_USERS_INFO_SUCCESS,
    payload: data
  }
}

export const userDataDelete = () => {
  return {
    type: getUserDataType.DATA_DELETE,
    payload: {}
  }
}

export const resetProfileEditing = () => {
  return {
    type: getUserDataType.RESET_EDITING,
    payload: {}
  }
}

export const editProfileFail = (message: string) => {
  return {
    type: getUserDataType.EDIT_PROFILE_FAIL,
    payload: message
  }
}

export const editProfileSuccess = () => {
  return {
    type: getUserDataType.EDIT_PROFILE_SUCCESS,
    payload: {}
  }
}

export const getCurrentUserInfo = (token: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getUserInfoReq());
    const res = await Axios.get(`${api.loggedUserData}/${token}`);
    dispatch(getUserInfoSuccess(res.data.payload));

  } catch (error) {
    dispatch(getUserInfoFail());
  }
}


export const requestEditProfile = (userData: IGetUserData, history: History, token: string) => async (dispatch: Dispatch<any>) => {
  try {

    await Axios.put(`${api.apiUser}`, userData);
    dispatch(editProfileSuccess());
    dispatch(getCurrentUserInfo(token));
    store.addNotification({
      title: "Отлично!",
      message: "Новые изменения сохранены!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
    dispatch(resetProfileEditing());
    history.push(urls.reservations);

  } catch (error) {
    dispatch(editProfileFail(error.response.data.payload.message));
  }
}
