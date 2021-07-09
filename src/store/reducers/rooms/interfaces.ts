export interface IRoom {
  building?: {
    id?: string,
    name?: string,
    city?: {
      id: string,
      name: string,
    }
  }
  id?: string
  name?: string,
  number?: number,
  photo?: string,
  place?: string,
  color?: string,
  status?: boolean | string,
  building_id?: string
} 

export interface IroomsReducer {
  loading: boolean,
  roomsError: null | string,
  editError: null | string,
  addError: null | string,
  deleteError: null | string,
  uploadError: null | string,
  rooms: IRoom[],
  room: IRoom, 
  showAlert: string,
  imgSrc: string
}

