import { IReservation } from "../interfaces";

export interface IMeetingRoomsInfo {
  id?: string,
  number?: string,
  name?: string,
  is_busy?: boolean,
  photo?: string, 
  reservations? : IReservation[]
}

export interface IMeetingRoomsInfoReducer {
  loading: boolean,
  error: null | string,
  meetingRoomsInfo: IMeetingRoomsInfo[],
  checkedRooms: string[]
}


