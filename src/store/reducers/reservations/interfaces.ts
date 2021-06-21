export interface IResRoom {
  number?: number,
  name?: string,
  color?: string,
}

export interface IResUser {
  lastname?: string,
  name?: string 
}

export interface IReservation {
  start_time?: string | Date | null,
  end_time?: string | Date | null,
  meeting_room?: any,
  meeting_room_id?: any,
  purpose?: string,
  user_id?: string, 
  date?: string | Date | null
}  

export interface IreservationsReducer {
  loading: boolean,
  error: null | any,
  addError: null | any,
  booking: IReservation[] | string,
  showAlert: string,
}
