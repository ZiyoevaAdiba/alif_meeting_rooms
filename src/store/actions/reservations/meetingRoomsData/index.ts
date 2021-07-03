import { getMeetingRoomsDataType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../../routes/urls";
import { Axios } from "../../../../shared/axios";
import { History } from "history";

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

const getMRsInfoSuccess = (data?: any) => {
  return {
    type: getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO_SUCCESS,
    payload: data
  }
}


export const getMRsInfo = (history: History) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    history.push(`${urls.reservations}?city=&building=`) 

  } catch (error) {
    dispatch(getMRsInfoFail());
  }
};

export const getMRsByCityId = (city_id: any, history: History, selectedBuilding: string) => async(dispatch: Dispatch<any>) => {
  try {    
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}/${city_id}/city`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    history.push(`${urls.reservations}?city=${city_id}&building=${selectedBuilding}`)

  } catch (error) {
    dispatch(getMRsInfoFail());
    console.log(error.response);
  }
};

export const getMRsByBuildingId = (building_id: any, history: History, selectedCity: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}/${building_id}/building`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    history.push(`${urls.reservations}?city=${selectedCity}&building=${building_id}`)

  } catch (error) {
    dispatch(getMRsInfoFail());
    console.log(error.response);
  }
}
