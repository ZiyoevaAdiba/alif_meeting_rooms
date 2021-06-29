export interface IGetUserData {
  id?: string,
  last_name?: string,
  name?: string,
  role?: string,
}

export interface IGetUserDataReducer {
  loading: boolean,
  error: null | any,
  userData: IGetUserData,
}


