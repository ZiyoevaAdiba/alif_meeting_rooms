import { getUsersType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../routes/urls";
import { IUser } from '../../reducers/users/interfaces'
import { Axios } from "../../../shared/axios";
import { History } from "history";
import { IUserData } from "../signUp/interfaces";
import { requestFail } from "../signUp"; 
import { store } from "react-notifications-component";

const getUsersReq = () => {
  return {
    type: getUsersType.GET_USERS,
    payload: {}
  }
}

const getUsersReqFail = () => {
  return {
    type: getUsersType.GET_USERS_FAIL,
    payload: {}
  }
}

const getUsersReqSuccess = (data: any) => {
  return {
    type: getUsersType.GET_USERS_SUCCESS,
    payload: data
  }
}

export const showUserData = (data: IUser) => {
  return {
    type: getUsersType.SHOW_USER,
    payload: data
  }
}

export const resetUserEditing = () => {
  return {
    type: getUsersType.RESET_EDITING,
    payload: {}
  }
}

export const userWarningDelete = (rowId: string) => {
  return {
    type: getUsersType.SHOW_WARNING,
    payload: rowId
  }
}

export const cancelUserDelete = () => {
  return {
    type: getUsersType.CANCEL_DELETE,
    payload: {}
  }
}

export const editUserReqFail = (message: string) => {
  return {
    type: getUsersType.EDIT_USER_FAIL,
    payload: message
  }
}

export const editUserReqSuccess = () => {
  return {
    type: getUsersType.EDIT_USER_SUCCESS,
    payload: {}
  }
}

export const getAllUsers = (page: number, search: string, history: History) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getUsersReq());
    const res = await Axios.get(`${api.users}?page=${page}&search=${search}`);
    dispatch(getUsersReqSuccess(res.data.payload));
    history.push(`${urls.users}?page=${page}&search=${search}`);

  } catch (error) {
    dispatch(getUsersReqFail());
  }
}

export const requestAddUser = (page: number, search: string, history: History, userData: IUserData, setSubmitting: any, setOpen: any) => async(dispatch: Dispatch<any>) => {
  try {
    delete userData.department;
    dispatch(getUsersReq());
    await Axios.post(`${api.users}`, userData);
    setOpen(false);
    store.addNotification({
      title: "Отлично!",
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
    dispatch(getAllUsers(page, search, history));
    
  } catch (error) {
    dispatch(requestFail(error.response.data.payload.message));
    setSubmitting(false);
  }
}

export const requestDeleteUser = (page: number, search: string, history: History, userId: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getUsersReq());
    await Axios.delete(`${api.users}/${userId}`);
    dispatch(getAllUsers(page, search, history));
    
  } catch (error) {
    dispatch(getUsersReqFail());
  }
}

export const requestEditUser = (
  page: number, 
  search: string, 
  history: History, 
  userData: any
  ) => async(dispatch: Dispatch<any>) => {
  try {
    const userId = userData.id;
    delete userData.id;
    delete userData.created_at;
    await Axios.put(`${api.users}/${userId}`, userData);
    dispatch(editUserReqSuccess());
    dispatch(resetUserEditing());
    dispatch(getAllUsers(page, search, history));
    
  } catch (error) {
    dispatch(editUserReqFail(error.response.data.payload.message));
  }
}
