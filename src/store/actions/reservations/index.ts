import { getReservationsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IReservation } from "../../reducers/reservations/interfaces";
import { History } from "history";
import { getFilteredMRs } from "../../../shared/components/Reservations/getFilteredMRs";

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
  };
}
const getReservationsSuccess = (data?: IReservation[]) => {
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
    type: getReservationsType.ADD_RESERVATION_FAIL,
    payload: message
  }
}

export const reservationSuccess = () => {
  return {
    type: getReservationsType.RESET_RESERVATION_ERRORS,
    payload: {}
  }
}

export const requestAddReservation = (
  reservationData: IReservation,
  setOpen: (state: boolean) => void,
  selectedCity: string,
  history: History,
  selectedBuilding: string
) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(getReservationsReq());
    await Axios.post(`${api.reservations}`, reservationData);
    dispatch(reservationSuccess());
    dispatch(getMRReservations(reservationData.meeting_room_id));
    setOpen(false);
    getFilteredMRs(selectedCity, history, selectedBuilding, dispatch)

  } catch (error) {
    dispatch(addReservationFail(error.response.data.payload.message));
  }
}

export const requestDeleteReservation = (reservationId: string, mrID?: string) => async (dispatch: Dispatch<any>) => {
  try {
    await Axios.delete(`${api.reservations}/${reservationId}`);
    dispatch(getMRReservations(mrID));
  } catch (error) {
    dispatch(getReservationsFail());
  }
}

export const getMRReservations = (mrID?: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await Axios.get(`${api.mrReservations}/${mrID}/meeting`);
    const { payload } = res.data;

    const reservationData = (typeof payload.id === 'string')
      ? [payload]
      : payload;

    dispatch(getReservationsSuccess(reservationData));
  } catch (error) {
    dispatch(getReservationsFail());
  }
}