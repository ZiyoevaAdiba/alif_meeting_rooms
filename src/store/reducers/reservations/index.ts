import { getReservationsType } from "../../actions/reservations/interfaces";
import { IGetMRReservationsReducer } from "./interfaces";

const initialState: IGetMRReservationsReducer = {
  loading: false,
  error: null ,
  booking: [],
  showAlert: '',
};


export const getMRReservationsReducer = (state = initialState, action: any) => {
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
      return {
        ...state,
        loading: false,
        error: null,
        booking: action.payload,
      };
    case getReservationsType.SHOW_WARNING:
      return{
        ...state,
        showAlert: action.payload
      }
    case getReservationsType.CANCEL_DELETE:
      return{
        ...state,
        showAlert: '',
      }
    default:
      return state;
  }
} 