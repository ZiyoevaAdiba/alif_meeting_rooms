import { getBuildingsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { IUser } from '../../reducers/users/interfaces'
import { Axios } from "../../../shared/axios";
import { store } from "react-notifications-component";
import { IBuilding } from "../../reducers/buildings/interfaces";

const getBuildingsReq = () => {
  return {
    type: getBuildingsType.GET_BUILDINGS,
    payload: {}
  }
}

const getBuildingsReqFail = () => {
  return {
    type: getBuildingsType.GET_BUILDINGS_FAIL,
    payload: {}
  }
}

const getBuildingsReqSuccess = (data: IBuilding[]) => {
  return {
    type: getBuildingsType.GET_BUILDINGS_SUCCESS,
    payload: data
  }
}

export const showBuildingData = (data: IBuilding) => {
  return {
    type: getBuildingsType.SHOW_BUILDING,
    payload: data
  }
}

export const resetBuildingEditing = () => {
  return {
    type: getBuildingsType.RESET_EDITING,
    payload: {}
  }
}

export const buildingWarningDelete = (rowId: string) => {
  return {
    type: getBuildingsType.SHOW_WARNING,
    payload: rowId
  }
}

export const cancelBuildingDelete = () => {
  return {
    type: getBuildingsType.CANCEL_DELETE,
    payload: {}
  }
}

export const editBuildingReqFail = (message: string) => {
  return {
    type: getBuildingsType.EDIT_BUILDING_FAIL,
    payload: message
  }
}

export const editBuildingReqSuccess = () => {
  return {
    type: getBuildingsType.EDIT_BUILDING_SUCCESS,
    payload: {}
  }
}
export const addBuildingFail = (message: string) => {
  return {
    type: getBuildingsType.ADD_BUILDING_FAIL,
    payload: message
  }
}

export const addBuildingSuccess = () => {
  return {
    type: getBuildingsType.RESET_BUILDINGS_ERRORS,
    payload: {}
  }
}

export const getAllBuildings = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getBuildingsReq());
    const res = await Axios.get(`${api.apiBuildings}`);
    dispatch(getBuildingsReqSuccess(res.data.payload));

  } catch (error) {
    dispatch(getBuildingsReqFail());
  }
};

export const getBuildingsByCityId = (city_id: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getBuildingsReq());
    const res = await Axios.get(`${api.adminBuildings}/${city_id}/city`);
    dispatch(getBuildingsReqSuccess(res.data.payload));

  } catch (error) {
    dispatch(getBuildingsReqFail());
  }
};

export const requestAddBuilding = (
  buildingData: IBuilding,
  setSubmitting: (state: boolean) => void,
  setOpen: (state: boolean) => void
) => async (dispatch: Dispatch<any>) => {
  try {
    await Axios.post(`${api.adminBuildings}`, buildingData);
    dispatch(addBuildingSuccess());
    setOpen(false);
    store.addNotification({
      title: "Отлично!",
      message: "Новый офис добавлен!",
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
    dispatch(getAllBuildings());

  } catch (error) {
    dispatch(addBuildingFail(error.response.data.payload.message));
    setSubmitting(false);
  }
}

export const requestDeleteBuilding = (buildingId: string) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getBuildingsReq());
    await Axios.delete(`${api.adminBuildings}/${buildingId}`);
    dispatch(getAllBuildings());

  } catch (error) {
    dispatch(getBuildingsReqFail());
  }
}

export const requestEditBuilding = (buildingData: IBuilding) => async (dispatch: Dispatch<any>) => {
  try {
    const buildingId = buildingData.id;
    delete buildingData.id;
    await Axios.put(`${api.adminBuildings}/${buildingId}`, buildingData);
    dispatch(editBuildingReqSuccess());
    dispatch(resetBuildingEditing());
    dispatch(getAllBuildings());

  } catch (error) {
    dispatch(editBuildingReqFail(error.response.data.payload.message));
  }
}
