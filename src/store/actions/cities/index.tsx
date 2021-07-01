import { getCitiesType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IDepartment } from "../../reducers/departments/interfaces";

const getCitiesReq = () => {
  return {
    type: getCitiesType.GET_CITIES,
    payload: {}
  }
}

const getCitiesFail = () => {
  return {
    type: getCitiesType.GET_CITIES_FAIL,
    payload: {}
  }
}

const getCitiesSuccess = (data?: IDepartment[]) => {
  return {
    type: getCitiesType.GET_CITIES_SUCCESS,
    payload: data
  }
}

export const showCityData = (data: IDepartment) => {
  return {
    type: getCitiesType.SHOW_CITY,
    payload: data
  }
}

export const resetCityEditing = () => {
  return {
    type: getCitiesType.RESET_EDITING,
    payload: {}
  }
}

export const citiesWarningDelete = (rowId: string) => {
  return {
    type: getCitiesType.SHOW_WARNING,
    payload: rowId
  }
}

export const cancelCitiesDelete = () => {
  return {
    type: getCitiesType.CANCEL_DELETE,
    payload: {}
  }
}


export const addCityFail = (message: string) => {
  return {
    type: getCitiesType.ADD_CITY_FAIL,
    payload: message
  }
}

export const addCitySuccess = () => {
  return {
    type: getCitiesType.RESET_CITIES_ERRORS,
    payload: {}
  }
}


export const editCityFail = (message: string) => {
  return {
    type: getCitiesType.EDIT_CITY_FAIL,
    payload: message
  }
}


export const getAllCities = () => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getCitiesReq());
    const res = await Axios.get(`${api.apiCities}`);
    dispatch(getCitiesSuccess(res.data.payload));

  } catch (error) {
    dispatch(getCitiesFail());
    // console.log(error.response);
  }
}

// export const getDepartments = () => async(dispatch: Dispatch<any>) => {
//   try {
//     dispatch(getDepartmentsReq());
//     const res = await Axios.get(`${api.departmentsForDropdown}`);
//     dispatch(getDepartmentsSuccess(res.data.payload));

//   } catch (error) {
//     dispatch(getDepartmentsFail());
//     // console.log(error.response);
//   }
// }


export const requestAddCity = (depData: string, setOpen: any) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getCitiesReq());
    
    const data = {
      name: depData
    };
    
    await Axios.post(`${api.adminCities}`, data);
    dispatch(addCitySuccess())
    setOpen(false)
    dispatch(getAllCities());
    
  } catch (error) {
    dispatch(addCityFail(error.response.data.payload.message));
    // console.log(error.response);
  }
}



export const requestEditCity = (
  depData: string | undefined, 
  setOpen: any,
  id: string | undefined,
  ) => async(dispatch: Dispatch<any>) => {
  try {    
    const data = {
      name: depData
    };

    await Axios.put(`${api.adminCities}/${id}`, data);
    setOpen(false)
    dispatch(addCitySuccess());
    dispatch(resetCityEditing());
    dispatch(getAllCities());
    
  } catch (error) {
    dispatch(editCityFail(error.response.data.payload.message));
  }
}

export const requestDeleteCity = (depId: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getCitiesReq());
    await Axios.delete(`${api.adminCities}/${depId}`);
    dispatch(getAllCities());
    
  } catch (error) {
    dispatch(getCitiesFail());
    // console.log(error.response);
  }
}
