import { getRoomsType } from "../../actions/rooms/interfaces";
import { IAction } from "../interfaces";
import { IRoom, IroomsReducer } from "./interfaces";

const initialState: IroomsReducer = {
  room: {},
  rooms: [],
  loading: false,
  roomsError: null,
  editError: null,
  addError: null,
  uploadError: null,
  deleteError: null,
  showAlert: "",
  imgSrc: "",
};

export const roomsReducer = (
  state = initialState,
  action: IAction<IRoom | IRoom[] | string>
): IroomsReducer => {
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
        roomsError: "Проверьте доступ. Попробуйте снова",
      };
    case getRoomsType.GET_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        roomsError: null,
        rooms: action.payload as IRoom[],
        editError: null,
        addError: null,
      };
    case getRoomsType.SHOW_ROOM:
      const { building } = action.payload as IRoom;
      return {
        ...state,
        room: {
          ...(action.payload as IRoom),
          building_id: building?.id,
        },
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
        showAlert: action.payload as string,
      };
    case getRoomsType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: "",
      };
    case getRoomsType.GET_URL: {
      return {
        ...state,
        imgSrc: action.payload as string,
      };
    }
    case getRoomsType.CANCEL_UPLOAD: {
      return {
        ...state,
        imgSrc: "",
        uploadError: null,
        loading: false,
      };
    }
    case getRoomsType.UPLOAD_PIC_FAIL:
      return {
        ...state,
        uploadError: "Размер изображения не должен превышать 1мб",
        loading: false,
      };
    case getRoomsType.EDIT_ROOM_FAIL:
      return {
        ...state,
        editError: action.payload as string,
        loading: false,
      };
    case getRoomsType.EDIT_ROOM_SUCCESS:
      return {
        ...state,
        editError: null,
        loading: false,
      };
    case getRoomsType.ADD_ROOM_FAIL:
      return {
        ...state,
        addError: action.payload as string,
        loading: false,
      };
    case getRoomsType.DELETE_ROOM_FAIL:
      return {
        ...state,
        deleteError: action.payload as string,
        loading: false,
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
};
