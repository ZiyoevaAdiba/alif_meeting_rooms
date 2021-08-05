import { getMeetingRoomsDataType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../../routes/urls";
import { Axios } from "../../../../shared/axios";
import { History } from "history";
import { IRoom } from "../../../reducers/rooms/interfaces";
import { IReservation } from "../../../reducers/reservations/interfaces";

const getMRsInfoReq = () => {
  return {
    type: getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO,
    payload: {}
  }
}

const getMRsInfoFail = () => {
  return {
    type: getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO_FAIL,
    payload: {}
  }
}

const getMRsInfoSuccess = (data?: IRoom[]) => {
  return {
    type: getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO_SUCCESS,
    payload: data
  }
}

export const getCheckedMRs = (data?: string[]) => {
  return {
    type: getMeetingRoomsDataType.GET_CHECKED_MRS_ID,
    payload: data
  }
}

export const getMRsInfo = (history: History, selectedRooms?: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    history.push(`${urls.reservations}?city=&building=&rooms=${selectedRooms || ''}`) 

  } catch (error) {
    dispatch(getMRsInfoFail());
  }
};

export const getMRsByCityId = (city_id: string, history: History, selectedBuilding: string, selectedRooms: string) => async(dispatch: Dispatch<any>) => {
  try {    
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}/${city_id}/city`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    history.push(`${urls.reservations}?city=${city_id}&building=${selectedBuilding}&rooms=${selectedRooms}`)
  } catch (error) {
    dispatch(getMRsInfoFail());
  }
};

export const getMRsByBuildingId = (building_id: string, history: History, selectedCity: string, selectedRooms: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}/${building_id}/building`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    history.push(`${urls.reservations}?city=${selectedCity}&building=${building_id}&rooms=${selectedRooms}`)
  } catch (error) {
    dispatch(getMRsInfoFail());
  }
}
