export interface IGetMeetingRoomInfo {
  id?: string,
  number?: string,
  name?: string,
  
}

export interface IGetMeetingRoomInfoReducer {
  loading: boolean,
  error: null | any,
  meetingRoomInfo: IGetMeetingRoomInfo[],
}


