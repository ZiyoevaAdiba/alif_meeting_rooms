export interface IRoom {
  city?: string,
  color?: string, 
  name?: string,
  number?: number,
  place?: string,
  status?: boolean | string,
} 

export interface IGetRoomsReducer {
  loading: boolean,
  error: null | any,
  rooms: IRoom[],
  room: IRoom | {},
  showAlert: string,

}

