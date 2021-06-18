import { getMeetingRoomsDataType } from "../../../actions/reservations/meetingRoomsData/interfaces";
import { IMeetingRoomsInfoReducer } from "./interfaces";

const initialState: IMeetingRoomsInfoReducer = {
  loading: false,
  error: null ,
  meetingRoomsInfo: [],
};

export const getMRsDataReducer = (state = initialState, action: any) => {
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
        error: 'Проверьте доступ. Попробуйте снова',
      };
    case getMeetingRoomsDataType.GET_MEETING_ROOMS_INFO_SUCCESS:
      const payload = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        meetingRoomsInfo: payload,
      };
    default:
      return state;
  }
}