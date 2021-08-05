import { IRoom } from "../rooms/interfaces";
import { IUser } from "../users/interfaces";

export interface IResRoom {
  number?: number,
  name?: string,
  color?: string,
}

export interface IResUser {
  last_name?: string,
  name?: string 
}

export interface IReservation {
  id?: string,
  start_time?: string | Date | null,
  end_time?: string | Date | null,
  meeting_room?: IRoom,
  meeting_room_id?: string,
  purpose?: string,
  user_id?: string, 
  user?: IUser
  date?: string | Date | null
}  
export interface IReservationEmpty {
  id: string
}

export interface IreservationsReducer {
  loading: boolean,
  error: null | string,
  addError: null | string,
  editError: null | string,
  booking: IReservation,
  showAlert: string,
}
