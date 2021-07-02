export interface IRoom {
  building?: {
    id?: string,
    name?: string,
    city?: {
      id: string,
      name: string,
    }
  }
  name?: string,
  number?: number,
  photo?: any,   
  place?: string,
  color?: string,
  status?: boolean | string,
  building_id?: string
} 

export interface IroomsReducer {
  loading: boolean,
  roomsError: null | any,
  editError: null | any,
  addError: null | any,
  deleteError: null | any,
  rooms: IRoom[],
  room: IRoom, 
  showAlert: string,
  imgSrc: string
}

