import { getMeetingRoomsDataType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../../routes/urls";
import { Axios } from "../../../../shared/axios";
import { History } from "history";
import { IRoom } from "../../../reducers/rooms/interfaces";

const getMRsInfoReq = () => {
  return {
    type: getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO,
    payload: {},
  };
};

const getMRsInfoFail = () => {
  return {
    type: getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO_FAIL,
    payload: {},
  };
};

const getMRsInfoSuccess = (data?: IRoom[]) => {
  return {
    type: getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO_SUCCESS,
    payload: data,
  };
};

export const getCheckedMRs = (data?: string[]) => {
  return {
    type: getMeetingRoomsDataType.GET_CHECKED_MRS_ID,
    payload: data,
  };
};

function getMonday(date: string) {
  const dateInDateFormat: Date = new Date(date);
  const day = dateInDateFormat.getDay();
  const diff = dateInDateFormat.getDate() - day + (day == 0 ? -6 : 1);
  console.log(day);
  
  // adjust when day is sunday
  return new Date(dateInDateFormat.setDate(diff));
}

export const getMRsInfo =
  (history: History, selectedRooms?: string, date?: string) =>
  async (dispatch: Dispatch<any>) => {
    const monday = getMonday(date as string).toISOString().split('.')[0]+"Z";
console.log(monday);

    try {
      dispatch(getMRsInfoReq());
      const res = await Axios.get(`${api.meetingRooms}?week=${monday}`);
      dispatch(getMRsInfoSuccess(res.data.payload));
      history.push(
        `${urls.reservations}?date=${date || ""}&city=&building=&rooms=${
          selectedRooms || ""
        }`
      );
    } catch (error) {
      dispatch(getMRsInfoFail());
    }
  };

export const getMRsByCityId =
  (
    city_id: string,
    history: History,
    selectedBuilding: string,
    selectedRooms: string,
    date?: string
  ) =>
  async (dispatch: Dispatch<any>) => {
    const monday = getMonday(date as string);
    try {
      // dispatch(getMRsInfoReq());
      // const res = await Axios.get(
      //   `${api.meetingRooms}/${city_id}/city?week=${monday}`
      // );
      // dispatch(getMRsInfoSuccess(res.data.payload));
      history.push(
        `${urls.reservations}?date=${date}&city=${city_id}&building=${selectedBuilding}&rooms=${selectedRooms}`
      );
    } catch (error) {
      dispatch(getMRsInfoFail());
    }
  };

export const getMRsByBuildingId =
  (
    building_id: string,
    history: History,
    selectedCity: string,
    selectedRooms: string,
    date?: string
  ) =>
  async (dispatch: Dispatch<any>) => {
    const monday = getMonday(date as string);

    try {
      // dispatch(getMRsInfoReq());
      // const res = await Axios.get(
      //   `${api.meetingRooms}/${building_id}/building?week=${monday}`
      // );
      // dispatch(getMRsInfoSuccess(res.data.payload));
      history.push(
        `${urls.reservations}?date=${date}&city=${selectedCity}&building=${building_id}&rooms=${selectedRooms}`
      );
    } catch (error) {
      dispatch(getMRsInfoFail());
    }
  };
