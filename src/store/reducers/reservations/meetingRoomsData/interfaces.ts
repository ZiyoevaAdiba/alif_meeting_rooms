export interface IGetMeetingRoomInfo {
  id?: string,
  number?: string,
  name?: string,
  isBusy?: boolean
  
}

export interface IGetMeetingRoomInfoReducer {
  loading: boolean,
  error: null | any,
  meetingRoomInfo: IGetMeetingRoomInfo[],
}


