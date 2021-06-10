export interface IGetMeetingRoomInfo {
  id?: string,
  number?: string,
}

export interface IGetMeetingRoomInfoReducer {
  loading: boolean,
  error: null | any,
  meetingRoomInfo: IGetMeetingRoomInfo[],
}


