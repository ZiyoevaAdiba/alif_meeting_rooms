export interface IGetUserData {
  id?: string,
  lastname?: string,
  name?: string,
  role?: string,
}

export interface IGetUserDataReducer {
  loading: boolean,
  error: null | any,
  userData: IGetUserData,
}


