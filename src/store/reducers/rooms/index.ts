import { getRoomsType } from "../../actions/rooms/interfaces";
import { IroomsReducer } from "./interfaces";

const initialState: IroomsReducer = {
  room: {},
  rooms: [],
  loading: false,
  roomsError: null,
  editError: null,
  addError: null,
  showAlert: '',
  imgSrc: '',
};


export const roomsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getRoomsType.GET_ROOMS:
      return {
        ...state,
        loading: true,
        roomsError: null,
      };
    case getRoomsType.GET_ROOMS_FAIL:
      return {
        ...state,
        loading: false,
        roomsError: 'Проверьте доступ. Попробуйте снова',
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
      return {
        ...state,
        room: action.payload,
      };
    case getRoomsType.RESET_EDITING:
      return {
        ...state,
        room: {},
        editError: null,
      };
    case getRoomsType.SHOW_WARNING:
      return {
        ...state,
        showAlert: action.payload
      }
    case getRoomsType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: '',
      }
    case getRoomsType.GET_URL: {
      return {
        ...state,
        imgSrc: action.payload
      }
    }
    case getRoomsType.CANCEL_UPLOAD: {
      return {
        ...state,
        imgSrc: ''
      }
    }
    case getRoomsType.EDIT_ROOM_FAIL:
      return {
        ...state,
        editError: action.payload,
      };
    case getRoomsType.EDIT_ROOM_SUCCESS:
      return {
        ...state,
        editError: null,
      };
    case getRoomsType.ADD_ROOM_FAIL:
      return {
        ...state,
        addError: action.payload,
      };
    case getRoomsType.ADD_ROOM_SUCCESS:
      return {
        ...state,
        addError: null,
      };
    default:
      return state;
  }
}