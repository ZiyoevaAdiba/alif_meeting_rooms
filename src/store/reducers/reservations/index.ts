import { getReservationsType } from "../../actions/reservations/interfaces";
import { IreservationsReducer } from "./interfaces";

const initialState: IreservationsReducer = {
  loading: false,
  error: null,
  booking: [],
  showAlert: '',
};


export const reservationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getReservationsType.GET_RESERVATIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case getReservationsType.GET_RESERVATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Проверьте доступ. Попробуйте снова',
      };
    case getReservationsType.GET_RESERVATIONS_SUCCESS:
      const reservationData = (typeof action.payload.id === 'string')
        ? action.payload.id
        : action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        booking: reservationData,
      };
    case getReservationsType.SHOW_WARNING:
      return {
        ...state,
        showAlert: action.payload
      }
    case getReservationsType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: '',
      }
    default:
      return state;
  }
}