import { getMeetingRoomsDataType } from "../../../actions/reservations/meetingRoomsData/interfaces";
import { IGetMeetingRoomInfoReducer } from "./interfaces";

const initialState: IGetMeetingRoomInfoReducer = {
  loading: false,
  error: null ,
  meetingRoomInfo: [],
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
        meetingRoomInfo: payload,
      };
    default:
      return state;
  }
}