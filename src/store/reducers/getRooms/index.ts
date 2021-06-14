import { getRoomsType } from "../../actions/getRooms/interfaces";
import { IGetRoomsReducer } from "./interfaces";

const initialState: IGetRoomsReducer = {
  room: {},
  rooms: [],
  loading: false,
  error: null,
  showAlert: '',
};


export const getRoomsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getRoomsType.GET_ROOMS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case getRoomsType.GET_ROOMS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Проверьте доступ. Попробуйте снова',
      };
    case getRoomsType.GET_ROOMS_SUCCESS:
      const payload = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        rooms: payload,
      };
    case getRoomsType.SHOW_ROOM:
      return{
        ...state,
        room: action.payload,
      };
    case getRoomsType.RESET_EDITING:
      return{
        ...state,
        room: {}
      };
    case getRoomsType.SHOW_WARNING:
      return{
        ...state,
        showAlert: action.payload
      }
    case getRoomsType.CANCEL_DELETE:
      return{
        ...state,
        showAlert: '',
      }
    default:
      return state;
  }
}