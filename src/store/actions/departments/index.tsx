import { getDepartmentsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IDepartment } from "../../reducers/departments/interfaces";

const getDepartmentsReq = () => {
  return {
    type: getDepartmentsType.GET_DEPARTMENTS,
    payload: {},
  };
};

const getDepartmentsFail = () => {
  return {
    type: getDepartmentsType.GET_DEPARTMENTS_FAIL,
    payload: {},
  };
};

const getDepartmentsSuccess = (data?: IDepartment[]) => {
  return {
    type: getDepartmentsType.GET_DEPARTMENTS_SUCCESS,
    payload: data,
  };
};

export const showDepartmentData = (data: IDepartment) => {
  return {
    type: getDepartmentsType.SHOW_DEPARTMENT,
    payload: data,
  };
};

export const resetDepartmentEditing = () => {
  return {
    type: getDepartmentsType.RESET_EDITING,
    payload: {},
  };
};

export const departmentsWarningDelete = (rowId: string) => {
  return {
    type: getDepartmentsType.SHOW_WARNING,
    payload: rowId,
  };
};

export const cancelDepartmentsDelete = () => {
  return {
    type: getDepartmentsType.CANCEL_DELETE,
    payload: {},
  };
};

export const addDepFail = (message: string) => {
  return {
    type: getDepartmentsType.ADD_DEP_FAIL,
    payload: message,
  };
};

export const addDepSuccess = () => {
  return {
    type: getDepartmentsType.RESET_DEPARTMENTS_ERRORS,
    payload: {},
  };
};

export const editDepFail = (message: string) => {
  return {
    type: getDepartmentsType.EDIT_DEP_FAIL,
    payload: message,
  };
};

export const getAllDepartments = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getDepartmentsReq());
    const res = await Axios({
      url: `${api.departments}`,
      method: "GET",
    });
    dispatch(getDepartmentsSuccess(res.data.payload));
  } catch (error) {
    dispatch(getDepartmentsFail());
  }
};

export const getDepartments = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getDepartmentsReq());
    const res = await Axios({
      url: `${api.departmentsForDropdown}`,
      method: "GET",
    });
    dispatch(getDepartmentsSuccess(res.data.payload));
  } catch (error) {
    dispatch(getDepartmentsFail());
  }
};

export const requestAddDepartment =
  (depData: string, setOpen: (state: boolean) => void) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(getDepartmentsReq());

      const data = {
        name: depData,
      };

      await Axios({
        url: `${api.departments}`,
        method: "POST",
        data: data,
      });
      dispatch(addDepSuccess());
      setOpen(false);
      dispatch(getAllDepartments());
    } catch (error) {
      dispatch(addDepFail(error.response.data.payload.message));
    }
  };

export const requestEditDepartment =
  (
    depData: string | undefined,
    setOpen: (state: boolean) => void,
    id: string | undefined
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const data = {
        name: depData,
      };

      await Axios({
        url: `${api.departments}/${id}`,
        method: "PUT",
        data: data,
      });
      setOpen(false);
      dispatch(addDepSuccess());
      dispatch(resetDepartmentEditing());
      dispatch(getAllDepartments());
    } catch (error) {
      dispatch(editDepFail(error.response.data.payload.message));
    }
  };

export const requestDeleteDepartment =
  (depId: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(getDepartmentsReq());
      await Axios({
        url: `${api.departments}/${depId}`,
        method: "DELETE",
      });
      dispatch(getAllDepartments());
    } catch (error) {
      dispatch(getDepartmentsFail());
    }
  };
