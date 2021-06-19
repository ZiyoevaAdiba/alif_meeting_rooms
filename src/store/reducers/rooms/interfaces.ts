export interface IRoom {
  city?: string,
  name?: string,
  number?: number,
  photo?: any,   
  place?: string,
  color?: string,
  status?: boolean | string,
} 

export interface IroomsReducer {
  loading: boolean,
  roomsError: null | any,
  editError: null | any,
  addError: null | any,
  rooms: IRoom[],
  room: IRoom, 
  showAlert: string,
  imgSrc: string
}

