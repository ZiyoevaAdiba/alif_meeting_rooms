import { getRoomsType } from "../../actions/getRooms/interfaces";
import { IroomsReducer } from "./interfaces";

const initialState: IroomsReducer = {
  room: {},
  rooms: [],
  loading: false,
  error: null,
  showAlert: '',
  imgSrc: '',
};


export const roomsReducer = (state = initialState, action: any) => {
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
    case getRoomsType.GET_URL: {
      return{
        ...state,
        imgSrc: action.payload 
      }
    }
    case getRoomsType.CANCEL_UPLOAD: {
      return{
        ...state,
        imgSrc: ''
      }
    }
    default:
      return state;
  }
}