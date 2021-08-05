import { getMeetingRoomsDataType } from "../../../actions/reservations/meetingRoomsData/interfaces";
import { IAction } from "../../interfaces";
import { IMeetingRoomsInfo, IMeetingRoomsInfoReducer } from "./interfaces";

const initialState: IMeetingRoomsInfoReducer = {
  loading: false,
  error: null,
  meetingRoomsInfo: [],
  checkedRooms: []
};

export const getMRsDataReducer = (
  state = initialState,
  action: IAction<IMeetingRoomsInfo[] | string[]>
): IMeetingRoomsInfoReducer => {

  switch (action.type) {
    case getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Проверьте доступ. Попробуйте снова.',
      };
    case getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO_SUCCESS:
      const payload = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        meetingRoomsInfo: payload as IMeetingRoomsInfo[],
      };
    case getMeetingRoomsDataType.GET_CHECKED_MRS_ID:
      return {
        ...state,
        loading: false,
        error: null,
        checkedRooms: action.payload as string[],
      };
    default:
      return state;
  }
}