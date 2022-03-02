import { getReservationsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IReservation } from "../../reducers/reservations/interfaces";
import { History } from "history";
import { getFilteredMRs } from "../../../shared/components/CalendarView/getFilteredMRs";
import { store } from "react-notifications-component";

const getReservations = () => {
  return {
    type: getReservationsType.GET_RESERVATIONS,
    payload: {},
  };
};
const getReservationsFail = () => {
  return {
    type: getReservationsType.GET_RESERVATIONS_FAIL,
    payload: {},
  };
};
export const getCurrentReservation = (data?: IReservation) => {
  return {
    type: getReservationsType.GET_CURRENT_RESERVATION,
    payload: data,
  };
};

export const reservationWarningDelete = (rowId: string) => {
  return {
    type: getReservationsType.SHOW_WARNING,
    payload: rowId,
  };
};

export const cancelReservationDelete = () => {
  return {
    type: getReservationsType.CANCEL_DELETE,
    payload: {},
  };
};

export const addReservationFail = (message: string) => {
  return {
    type: getReservationsType.ADD_RESERVATION_FAIL,
    payload: message,
  };
};

export const addReservationReq = () => {
  return {
    type: getReservationsType.ADD_RESERVATION_REQ,
    payload: {},
  };
};

export const editReservationReq = () => {
  return {
    type: getReservationsType.EDIT_RESERVATION_REQ,
    payload: {},
  };
};
export const editReservationFail = (message: string) => {
  return {
    type: getReservationsType.EDIT_RESERVATION_FAIL,
    payload: message,
  };
};
export const reservationSuccess = () => {
  return {
    type: getReservationsType.RESET_RESERVATION_ERRORS,
    payload: {},
  };
};

export const requestAddReservation =
  (
    reservationData: IReservation,
    setOpen: (state: boolean) => void,
    selectedCity: string,
    history: History,
    selectedBuilding: string,
    selectedRooms: string,
    date: string
  ) =>
  async (dispatch: Dispatch<any>) => {
    dispatch(getReservations());
    dispatch(addReservationReq());
    try {
      await Axios({
        url: `${api.reservations}`,
        method: "POST",
        data: reservationData,
      });
      dispatch(reservationSuccess());
      setOpen(false);
      getFilteredMRs(
        date,
        selectedCity,
        history,
        selectedBuilding,
        selectedRooms,
        dispatch
      );
    } catch (error: any) {
      dispatch(addReservationFail(error.response.data.payload.message));
    }
  };

export const requestEditReservation =
  (
    editedReservation: IReservation,
    reservationId: string,
    setEditOpen: (state: boolean) => void,
    selectedCity: string,
    history: History,
    selectedBuilding: string,
    selectedRooms: string,
    date: string,
    all: boolean
  ) =>
  async (dispatch: Dispatch<any>) => {
    dispatch(editReservationReq());
    try {
      await Axios({
        url: `${api.reservations}/${reservationId}/${editedReservation.repeat_id}`,
        method: "PUT",
        data: editedReservation,
        params: { all },
      });
      setEditOpen(false);
      store.addNotification({
        title: "Успешно!",
        message: "Ваша бронь обновлена!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      getFilteredMRs(
        date,
        selectedCity,
        history,
        selectedBuilding,
        selectedRooms,
        dispatch
      );
    } catch (error: any) {
      dispatch(editReservationFail(error.response.data.payload.message));
    }
  };

export const requestDeleteReservation =
  (
    reservationId: string,
    repeat_id: string,
    selectedCity: string,
    history: History,
    selectedBuilding: string,
    selectedRooms: string,
    date: string,
    all: boolean
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      await Axios({
        url: `${api.reservations}/${reservationId}/${repeat_id || " "}`,
        method: "DELETE",
        params: { all },
      });
      getFilteredMRs(
        date,
        selectedCity,
        history,
        selectedBuilding,
        selectedRooms,
        dispatch
      );
      store.addNotification({
        title: "Успешно!",
        message: "Ваша бронь удалена!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } catch (error) {
      dispatch(getReservationsFail());
    }
  };
