import { getUserDataType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../../routes/urls";
import { Axios } from "../../../../shared/axios";
import { IUserData } from "../../signUp/interfaces";

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

export const getCurrentUserInfo = (token: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getUserInfoReq());
    const res = await Axios.get(`${api.loggedUserData}/${token}`);
    dispatch(getUserInfoSuccess(res.data.payload));
    
  } catch (error) {
    dispatch(getUserInfoFail());
  }
}

