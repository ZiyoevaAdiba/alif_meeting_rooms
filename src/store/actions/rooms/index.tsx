import { getRoomsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IRoom } from "../../reducers/rooms/interfaces";

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

export const getRoomsSuccess = (data?: IRoom[]) => {
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

export const resetRoomEditing = () => {
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

export const getRoomPicURL = (imgsrc: string) => {
  return {
    type: getRoomsType.GET_URL,
    payload: imgsrc
  }
}

export const cancelImgUpload = () => {
  return {
    type: getRoomsType.CANCEL_UPLOAD,
    payload: {}
  }
}

export const editRoomReqFail = (message: string) => {
  return {
    type: getRoomsType.EDIT_ROOM_FAIL,
    payload: message
  }
}

export const editRoomReqSuccess = () => {
  return {
    type: getRoomsType.EDIT_ROOM_SUCCESS,
    payload: {}
  }
}

export const addRoomReqFail = (message: string) => {
  return {
    type: getRoomsType.ADD_ROOM_FAIL,
    payload: message
  }
}

export const addRoomReqSuccess = () => {
  return {
    type: getRoomsType.RESET_ROOMS_ERRORS,
    payload: {}
  }
}

export const getAllRooms = () => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getRoomsReq());
    const res = await Axios.get(`${api.adminRooms}`);
    dispatch(getRoomsSuccess(res.data.payload));
    
  } catch (error) {
    dispatch(getRoomsFail());
    console.log(error.response);
  }
}

export const requestAddRoom = (roomData: IRoom, setSubmitting: any, setOpen: any) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getRoomsReq());
    await Axios.post(`${api.adminRooms}`, roomData); 
    dispatch(addRoomReqSuccess())
    setOpen(false);
    alert('Миттинг рум успешно добавлен.');
    dispatch(getAllRooms());
    
  } catch (error) {
    dispatch(addRoomReqFail(error.response.data.payload.message));
    console.log(error.response);
  }
}
export const addMRPhoto = (roomPhoto: any) => async(dispatch: Dispatch<any>) => {
  try {
    const res = await Axios.post(api.uploadPhoto, roomPhoto);
    // console.log(res);
    dispatch(getRoomPicURL(res.data.payload));

  } catch (error) {
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
    dispatch(editRoomReqSuccess());
    dispatch(resetRoomEditing());
    dispatch(cancelImgUpload());

    dispatch(getAllRooms());
    
  } catch (error) {
    dispatch(editRoomReqFail(error.response.data.payload.message));
    console.log(error.response);
  }
}
