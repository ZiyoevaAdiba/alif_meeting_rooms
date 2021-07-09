export interface ICity {
  name?: string,
  id?: string,
} 

export interface ICityReducer {
  loading: boolean,
  error: null | string,
  addError: null | string,
  editError: null | string,
  cities: ICity[],
  city: ICity,
  showAlert: string,

}

