import { getReservationsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IReservation } from "../../reducers/reservations/interfaces";
import { getMRsInfo } from "./meetingRoomsData";


const getReservationsReq = () => {
  return {
    type: getReservationsType.GET_RESERVATIONS,
    payload: {}
  }
}

const getReservationsSuccess = (data?: any) => {
  return {
    type: getReservationsType.GET_RESERVATIONS_SUCCESS,
    payload: data
  }
}

export const reservationWarningDelete = (rowId: string) => {
  return {
    type: getReservationsType.SHOW_WARNING,
    payload: rowId
  }
}

export const cancelReservationDelete = () => {
  return {
    type: getReservationsType.CANCEL_DELETE,
    payload: {}
  }
}


export const addReservationFail = (message: string) => {
  return {
    type: getReservationsType.GET_RESERVATIONS_FAIL,
    payload: message
  }
}

export const addReservationSuccess = () => {
  return {
    type: getReservationsType.ADD_RESERVATION_SUCCESS,
    payload: {}
  }
}

export const requestAddReservation = (reservationData: IReservation, setOpen: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getReservationsReq());
    await Axios.post(`${api.reservations}`, reservationData);
    dispatch(addReservationSuccess());
    dispatch(getMRReservations(reservationData.meeting_room_id));
    setOpen(false);
    dispatch(getMRsInfo());

  } catch (error) {
    dispatch(addReservationFail(error.response.data.payload.message));
  }
}

export const requestDeleteReservation = (mrID: string, reservationId: string) => async (dispatch: Dispatch<any>) => {
  try {
    await Axios.delete(`${api.reservations}/${reservationId}`);
    dispatch(getMRReservations(mrID));

  } catch (error) {
    // dispatch(getReservationsFail());
    console.log(error.response);
  }
}


export const getMRReservations = (mrID: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await Axios.get(`${api.mrReservations}/${mrID}/meeting`);
    dispatch(getReservationsSuccess(res.data.payload));

  } catch (error) {
    console.log(error.response);
  }
}