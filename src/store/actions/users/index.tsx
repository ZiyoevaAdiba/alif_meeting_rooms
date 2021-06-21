import { getUsersType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../routes/urls";
import { IUser } from '../../reducers/users/interfaces'
import { Axios } from "../../../shared/axios";
import { History } from "history";
import { IUserData } from "../signUp/interfaces";
import { requestFail } from "../signUp";
import { showOverflow } from "../../../shared/handlerStyle/bodyOverflow";

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

export const getAllUsers = (page: number, history: History) => async(dispatch: Dispatch<any>) => {
  
  try {
    dispatch(getUsersReq());
    const res = await Axios.get(`${api.users}/${page}`);
    dispatch(getUsersReqSuccess(res.data.payload));
    history.push(`${urls.users}?page=${page}`);

  } catch (error) {
    dispatch(getUsersReqFail());
    console.log(error.response);
  }
}

export const requestAddUser = (page: number, history: History, userData: IUserData, setSubmitting: any, setOpen: any) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getUsersReq());
    await Axios.post(`${api.users}`, userData);
    setOpen(false);
    alert('Пользователь успешно добавлен. Проверьте почту для подтверждения регистрации!');
    dispatch(getAllUsers(page, history));
    
  } catch (error) {
    dispatch(requestFail());
    setSubmitting(false);
    // alert(error.response.data.message);
  }
}

export const requestDeleteUser = (page: number, history: History, userId: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getUsersReq());
    await Axios.delete(`${api.users}/${userId}`);
    dispatch(getAllUsers(page, history));
    
  } catch (error) {
    dispatch(getUsersReqFail());
    console.log(error.response);
  }
}

export const requestEditUser = (page: number, history: History, userData: any) => async(dispatch: Dispatch<any>) => {
  try {
    await Axios.put(`${api.users}/${userData.id}`, userData);
    dispatch(editUserReqSuccess());
    dispatch(resetUserEditing());
    dispatch(getAllUsers(page, history));
    showOverflow();
  } catch (error) {
    dispatch(editUserReqFail(error.response.data.payload.message));
    console.log(error.response);
  }
}
