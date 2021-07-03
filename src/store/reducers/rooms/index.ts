import { getRoomsType } from "../../actions/rooms/interfaces";
import { IroomsReducer } from "./interfaces";

const initialState: IroomsReducer = {
  room: {},
  rooms: [],
  loading: false,
  roomsError: null,
  editError: null,
  addError: null,
  uploadError: null,
  deleteError: null,
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
        editError: null,
        addError: null,   
        deleteError: null, 
        uploadError: null,  
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
        roomsError: null,
        rooms: payload,
        editError: null,
        addError: null,      
      };
    case getRoomsType.SHOW_ROOM:
      return {
        ...state,
        room: {
          ...action.payload,
          building_id: action.payload.building.id
        }
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
        imgSrc: '',
        uploadError: null,
      }
    }
    case getRoomsType.UPLOAD_PIC_FAIL:
      return {
        ...state,
        uploadError: 'Размер изображения не должен превышать 1мб',
      };
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
    case getRoomsType.DELETE_ROOM_FAIL:
      return {
        ...state,
        deleteError: action.payload,
      };
    case getRoomsType.RESET_ROOMS_ERRORS:
      return {
        ...state,
        roomsError: null,
        editError: null,
        addError: null, 
        deleteError: null,
        uploadError: null,     
      };
    default:
      return state;
  }
}