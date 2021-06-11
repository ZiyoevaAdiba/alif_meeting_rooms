import { getRoomsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IRoom } from "../../reducers/getRooms/interfaces";

const getRoomsReq = () => {
  return {
    type: getRoomsType.GET_ROOMS,
    payload: {}
  }
}

const getRoomsFail = () => {
  return {
    type: getRoomsType.GET_ROOMS_FAIL,
    payload: {}
  }
}

const getRoomsSuccess = (data?: IRoom[]) => {
  return {
    type: getRoomsType.GET_ROOMS_SUCCESS,
    payload: data
  }
}

export const showRoomData = (data: IRoom) => {
  return {
    type: getRoomsType.SHOW_ROOM,
    payload: data
  }
}

export const resetEditing = () => {
  return {
    type: getRoomsType.RESET_EDITING,
    payload: {}
  }
}

export const roomWarningDelete = (rowId: string) => {
  return {
    type: getRoomsType.SHOW_WARNING,
    payload: rowId
  }
}

export const cancelRoomDelete = () => {
  return {
    type: getRoomsType.CANCEL_DELETE,
    payload: {}
  }
}

export const getAllRooms = () => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getRoomsReq());
    const res = await Axios.get(`${api.adminRooms}`);
    dispatch(getRoomsSuccess(res.data.payload));
    console.log(res.data);
    
  } catch (error) {
    dispatch(getRoomsFail());
    console.log(error.response);
  }
}

export const requestAddRoom = (roomData: IRoom, setSubmitting: any) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getRoomsReq());
    await Axios.post(`${api.adminRooms}`, roomData);
    dispatch(getAllRooms());
    
  } catch (error) {
    dispatch(getRoomsFail());
    console.log(error.response);
  }
}

export const requestDeleteRoom = (roomId: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getRoomsReq());
    await Axios.delete(`${api.adminRooms}/${roomId}`);
    dispatch(getAllRooms());
    
  } catch (error) {
    dispatch(getRoomsFail());
    console.log(error.response);
  }
}

export const requestEditRoom = (roomData: any) => async(dispatch: Dispatch<any>) => {
  try {
    roomData.status = (roomData.status === 'true')
    ? true
    : false;

    await Axios.put(`${api.adminRooms}/${roomData.id}`, roomData);
    dispatch(getAllRooms());
    
  } catch (error) {
    dispatch(getRoomsFail());
    console.log(error.response);
  }
}
