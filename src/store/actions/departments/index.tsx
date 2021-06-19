import { getDepartmentsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IDepartment } from "../../reducers/departments/interfaces";

const getDepartmentsReq = () => {
  return {
    type: getDepartmentsType.GET_DEPARTMENTS,
    payload: {}
  }
}

const getDepartmentsFail = () => {
  return {
    type: getDepartmentsType.GET_DEPARTMENTS_FAIL,
    payload: {}
  }
}

const getDepartmentsSuccess = (data?: IDepartment[]) => {
  return {
    type: getDepartmentsType.GET_DEPARTMENTS_SUCCESS,
    payload: data
  }
}


export const departmentsWarningDelete = (rowId: string) => {
  return {
    type: getDepartmentsType.SHOW_WARNING,
    payload: rowId
  }
}

export const cancelDepartmentsDelete = () => {
  return {
    type: getDepartmentsType.CANCEL_DELETE,
    payload: {}
  }
}


export const getAllDepartments = () => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getDepartmentsReq());
    const res = await Axios.get(`${api.departments}`);
    dispatch(getDepartmentsSuccess(res.data.payload));

  } catch (error) {
    dispatch(getDepartmentsFail());
    // console.log(error.response);
  }
}

export const getDepartments = () => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getDepartmentsReq());
    const res = await Axios.get(`${api.departmentsForDropdown}`);
    dispatch(getDepartmentsSuccess(res.data.payload));

  } catch (error) {
    dispatch(getDepartmentsFail());
    // console.log(error.response);
  }
}


export const requestAddDepartment = (depData: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getDepartmentsReq());
    
    const data = {
      name: depData
    };
    
    await Axios.post(`${api.departments}`, data);
    dispatch(getAllDepartments());
    
  } catch (error) {
    dispatch(getDepartmentsFail());
    // console.log(error.response);
  }
}

export const requestDeleteDepartment = (depId: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getDepartmentsReq());
    await Axios.delete(`${api.departments}/${depId}`);
    dispatch(getAllDepartments());
    
  } catch (error) {
    dispatch(getDepartmentsFail());
    // console.log(error.response);
  }
}
