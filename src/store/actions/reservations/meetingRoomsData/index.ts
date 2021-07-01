import { getMeetingRoomsDataType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../../routes/urls";
import { Axios } from "../../../../shared/axios";

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


export const getMRsInfo = () => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    
  } catch (error) {
    dispatch(getMRsInfoFail());
    console.log(error.response);
  }
};

export const getMRsByCityId = (city_id: any) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}/${city_id}/city`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    
  } catch (error) {
    dispatch(getMRsInfoFail());
    console.log(error.response);
  }
};

export const getMRsByBuildingId = (building_id: any) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getMRsInfoReq());
    const res = await Axios.get(`${api.meetingRooms}/${building_id}/building`);
    dispatch(getMRsInfoSuccess(res.data.payload));
    
  } catch (error) {
    dispatch(getMRsInfoFail());
    console.log(error.response);
  }
}
