export interface IRoom {
  city?: string,
  name?: string,
  number?: number,
  photo?: any,   
  place?: string,
  color?: string,
  status?: boolean | string,
} 

export interface IGetRoomsReducer {
  loading: boolean,
  error: null | any,
  rooms: IRoom[],
  room: IRoom, 
  showAlert: string,
  imgSrc: string
}

