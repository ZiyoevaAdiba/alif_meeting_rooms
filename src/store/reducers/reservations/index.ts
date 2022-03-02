import { getReservationsType } from "../../actions/reservations/interfaces";
import { IAction } from "../interfaces";
import { IReservation, IreservationsReducer } from "./interfaces";

const initialState: IreservationsReducer = {
  loading: false,
  spinner: false,
  error: null,
  addError: null,
  editError: null,
  booking: {},
  showAlert: "",
};

export const reservationsReducer = (
  state = initialState,
  action: IAction<IReservation[] | string>
): IreservationsReducer => {
  switch (action.type) {
    case getReservationsType.GET_RESERVATIONS:
      return {
        ...state,
        loading: true,
        spinner: true,
      };
    case getReservationsType.GET_RESERVATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: "Проверьте доступ. Попробуйте снова",
        spinner: false,
      };
    case getReservationsType.GET_CURRENT_RESERVATION:
      return {
        ...state,
        loading: false,
        error: null,
        booking: action.payload as IReservation,
        spinner: false,
      };
    case getReservationsType.SHOW_WARNING:
      return {
        ...state,
        showAlert: action.payload as string,
      };
    case getReservationsType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: "",
      };
    case getReservationsType.ADD_RESERVATION_REQ:
      return {
        ...state,
        spinner: true,
      };
    case getReservationsType.EDIT_RESERVATION_REQ:
      return {
        ...state,
        spinner: true,
      };
    case getReservationsType.ADD_RESERVATION_FAIL:
      return {
        ...state,
        addError: action.payload as string,
        loading: false,
        spinner: false,
      };
    case getReservationsType.EDIT_RESERVATION_FAIL:
      return {
        ...state,
        editError: action.payload as string,
        loading: false,
        spinner: false,
      };
    case getReservationsType.RESET_RESERVATION_ERRORS:
      return {
        ...state,
        addError: null,
        error: null,
        editError: null,
        loading: false,
        spinner: false,
      };
    default:
      return state;
  }
};
