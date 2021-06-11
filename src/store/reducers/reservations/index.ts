import { getReservationsType } from "../../actions/reservations/interfaces";
import { IGetReservationsReducer } from "./interfaces";

const initialState: IGetReservationsReducer = {
  loading: false,
  error: null ,
  booking: [],
  showAlert: '',
  pageCount: 1,
};



export const getReservationsReducer = (state = initialState, action: any) => {
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
        error: 'true',
      };
    case getReservationsType.GET_RESERVATIONS_SUCCESS:
      const {count_page, reserved_meeting_rooms } = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        booking: reserved_meeting_rooms,
        pageCount: count_page,
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