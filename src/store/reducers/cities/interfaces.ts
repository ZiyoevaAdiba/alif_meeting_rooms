export interface ICity {
  name?: string,
  id?: string,
} 

export interface ICityReducer {
  loading: boolean,
  error: null | any,
  addError: null | any,
  editError: null | any,
  cities: ICity[],
  city: ICity,
  showAlert: string,

}

