import { getReservationsType } from "./interfaces";
import { Dispatch } from "react";
import { api, urls } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { History } from "history";
import { IReservation } from "../../reducers/reservations/interfaces";


const getReservationsReq = () => {
  return {
    type: getReservationsType.GET_RESERVATIONS,
    payload: {}
  }
}

const getReservationsFail = () => {
  return {
    type: getReservationsType.GET_RESERVATIONS_FAIL,
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
    type: getReservationsType.SHOW_WARNING ,
    payload: rowId
  }
}

export const cancelReservationDelete = () => {
  return {
    type: getReservationsType.CANCEL_DELETE,
    payload: {}
  }
}


export const getAllReservations = (page: number, history: History) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getReservationsReq());
    const res = await Axios.get(`${api.reservations}/${page}`);
    dispatch(getReservationsSuccess(res.data.payload));
    history.push(`${urls.reservations}?page=${page}`);

  } catch (error) {
    dispatch(getReservationsFail());
    console.log(error.response);
  }
}

export const requestAddReservation = (pageNumber: number, history: History, reservationData: IReservation, userId: any) => async(dispatch: Dispatch<any>) => {
  try {
    console.log(reservationData);

    // console.log(userId);
    reservationData.user_id = userId;
    dispatch(getReservationsReq());
    await Axios.post(`${api.reservations}`, reservationData);
    dispatch(getAllReservations(pageNumber, history));
    
  } catch (error) {
    dispatch(getReservationsFail());
    console.log(error.response);
  }
}

export const requestDeleteReservation = (pageNumber: number, history: History, reservationId: string) => async(dispatch: Dispatch<any>) => {
  try {
    dispatch(getReservationsReq());
    await Axios.delete(`${api.reservations}/${reservationId}`);
    dispatch(getAllReservations(pageNumber, history));
    
  } catch (error) {
    dispatch(getReservationsFail());
    console.log(error.response);
  }
}