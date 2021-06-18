export interface IGetMeetingRoomInfo {
  id?: string,
  number?: string,
  name?: string,
  is_busy?: boolean,
  photo?: string, 
  
}

export interface IGetMeetingRoomInfoReducer {
  loading: boolean,
  error: null | any,
  meetingRoomInfo: IGetMeetingRoomInfo[],
}


