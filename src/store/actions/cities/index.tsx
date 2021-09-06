import { getCitiesType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IDepartment } from "../../reducers/departments/interfaces";
import { ICity } from "../../reducers/cities/interfaces";

const getCitiesReq = () => {
  return {
    type: getCitiesType.GET_CITIES,
    payload: {},
  };
};

const getCitiesFail = () => {
  return {
    type: getCitiesType.GET_CITIES_FAIL,
    payload: {},
  };
};

const getCitiesSuccess = (data?: IDepartment[]) => {
  return {
    type: getCitiesType.GET_CITIES_SUCCESS,
    payload: data,
  };
};

export const showCityData = (data: ICity) => {
  return {
    type: getCitiesType.SHOW_CITY,
    payload: data,
  };
};

export const resetCityEditing = () => {
  return {
    type: getCitiesType.RESET_EDITING,
    payload: {},
  };
};

export const citiesWarningDelete = (rowId: string) => {
  return {
    type: getCitiesType.SHOW_WARNING,
    payload: rowId,
  };
};

export const cancelCitiesDelete = () => {
  return {
    type: getCitiesType.CANCEL_DELETE,
    payload: {},
  };
};

export const addCityFail = (message: string) => {
  return {
    type: getCitiesType.ADD_CITY_FAIL,
    payload: message,
  };
};

export const addCitySuccess = () => {
  return {
    type: getCitiesType.RESET_CITIES_ERRORS,
    payload: {},
  };
};

export const editCityFail = (message: string) => {
  return {
    type: getCitiesType.EDIT_CITY_FAIL,
    payload: message,
  };
};

export const getAllCities = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getCitiesReq());
    const res = await Axios({
      url: `${api.apiCities}`,
      method: "GET",
    });
    dispatch(getCitiesSuccess(res.data.payload));
  } catch (error) {
    dispatch(getCitiesFail());
  }
};

export const requestAddCity =
  (depData: string, setOpen: (state: boolean) => void) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(getCitiesReq());

      const data = {
        name: depData,
      };

      await Axios({
        url: `${api.adminCities}`,
        method: "POST",
        data: data,
      });
      dispatch(addCitySuccess());
      setOpen(false);
      dispatch(getAllCities());
    } catch (error: any) {
      dispatch(addCityFail(error.response.data.payload.message));
    }
  };

export const requestEditCity =
  (
    depData: string | undefined,
    setOpen: (state: boolean) => void,
    id: string | undefined
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(getCitiesReq());

      const data = {
        name: depData,
      };
      await Axios({
        url: `${api.adminCities}/${id}`,
        method: "PUT",
        data: data,
      });
      dispatch(addCitySuccess());
      dispatch(resetCityEditing());
      setOpen(false);
      dispatch(getAllCities());
    } catch (error: any) {
      dispatch(editCityFail(error.response.data.payload.message));
    }
  };

export const requestDeleteCity =
  (depId: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(getCitiesReq());
      await Axios({
        url: `${api.adminCities}/${depId}`,
        method: "DELETE",
      });
      dispatch(getAllCities());
    } catch (error) {
      dispatch(getCitiesFail());
    }
  };
