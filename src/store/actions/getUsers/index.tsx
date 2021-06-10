import { getUsersType } from "../getUsers/interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../routes/urls";
import { IUser } from '../../reducers/getUsers/interfaces'
import { Axios } from "../../../shared/axios";
import { History } from "history";
import { IUserData } from "../signUp/interfaces";

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

export const requestAddUser = (pageNumber: number, history: History, userData: IUserData, setSubmitting: any) => async(dispatch: Dispatch<any>) => {
  try {
    console.log('add',userData)
    dispatch(getUsersReq());
    await Axios.post(`${api.users}`, userData);
    dispatch(getAllUsers(pageNumber, history));

  } catch (error) {
    dispatch(getUsersReqFail());
    setSubmitting(false);
    console.log(error.response);
  }
}

export const requestDeleteUser = (pageNumber: number, history: History, userId: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getUsersReq());
    await Axios.delete(`${api.users}/${userId}`);
    dispatch(getAllUsers(pageNumber, history));
    
  } catch (error) {
    dispatch(getUsersReqFail());
    console.log(error.response);
  }
}

export const requestEditUser = (pageNumber: number, history: History, userData: any) => async(dispatch: Dispatch<any>) => {
  try {
    await Axios.put(`${api.users}/${userData.id}`, userData);
    dispatch(getAllUsers(pageNumber, history));
    
  } catch (error) {
    dispatch(getUsersReqFail());
    console.log(error.response);
  }
}
