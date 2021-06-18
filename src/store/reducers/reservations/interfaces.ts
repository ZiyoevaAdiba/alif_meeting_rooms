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
  start_time?: string,
  end_time?: string,
  meeting_room?: any,
  meeting_room_id?: any,
  purpose?: string,
  user_id?: string, 
  date?: string
}  

export interface IGetMRReservationsReducer {
  loading: boolean,
  error: null | any,
  booking: IReservation[] | string,
  showAlert: string,
}
