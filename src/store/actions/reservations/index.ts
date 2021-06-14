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
  // try {
  //   dispatch(getReservationsReq());
  //   const res = await Axios.get(`${api.reservations}/${page}`);
  //   dispatch(getReservationsSuccess(res.data.payload));
  //   history.push(`${urls.reservations}?page=${page}`);

  // } catch (error) {
  //   dispatch(getReservationsFail());
  //   console.log(error.response);
  // }
}

export const requestAddReservation = (reservationData: IReservation, userId: any, mrID: string) => async(dispatch: Dispatch<any>) => {
  try {
    reservationData.user_id = userId;
    dispatch(getReservationsReq());
    await Axios.post(`${api.reservations}`, reservationData);
    dispatch(getMRReservations(mrID));
    
  } catch (error) {
    dispatch(getReservationsFail());
    console.log(error.response);
  }
}

export const requestDeleteReservation = (mrID: string, reservationId: string) => async(dispatch: Dispatch<any>) => {
  try {
    await Axios.delete(`${api.reservations}/${reservationId}`);
    dispatch(getMRReservations(mrID));
    
  } catch (error) {
    // dispatch(getReservationsFail());
    console.log(error.response);
  }
}


export const getMRReservations = (mrID: string) => async(dispatch: Dispatch<any>) => {
  try {
    const res = await Axios.get(`${api.mrReservations}/${mrID}/meeting`);
    dispatch(getReservationsSuccess(res.data.payload));
    
  } catch (error) {
    console.log(error.response);
  }
}