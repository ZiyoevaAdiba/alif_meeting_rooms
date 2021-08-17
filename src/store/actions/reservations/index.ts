import { getReservationsType } from "./interfaces";
import { Dispatch } from "react";
import { api } from "../../../routes/urls";
import { Axios } from "../../../shared/axios";
import { IReservation } from "../../reducers/reservations/interfaces";
import { History } from "history";
import { getFilteredMRs } from "../../../shared/components/CalendarView/getFilteredMRs";
import { store } from "react-notifications-component";

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

export const editReservationFail = (message: string) => {
  return {
    type: getReservationsType.ADD_RESERVATION_FAIL,
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
    try {
      await Axios.post(`${api.reservations}`, reservationData);
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
    } catch (error) {
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
    date: string
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      await Axios.put(
        `${api.reservations}/${reservationId}/${editedReservation.repeat_id}`,
        editedReservation
      );
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
    } catch (error) {
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
    date: string
  ) =>
  async (dispatch: Dispatch<any>) => {
    try {
      await Axios.delete(`${api.reservations}/${reservationId}/${repeat_id}`);
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
