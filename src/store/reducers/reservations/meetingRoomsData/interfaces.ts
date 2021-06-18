export interface IMeetingRoomsInfo {
  id?: string,
  number?: string,
  name?: string,
  is_busy?: boolean,
  photo?: string, 
  
}

export interface IMeetingRoomsInfoReducer {
  loading: boolean,
  error: null | any,
  meetingRoomsInfo: IMeetingRoomsInfo[],
}


