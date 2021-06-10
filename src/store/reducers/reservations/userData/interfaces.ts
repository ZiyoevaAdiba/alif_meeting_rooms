export interface IGetUserData {
  id?: string,
  lastname?: string,
  name?: string,
}

export interface IGetUserDataReducer {
  loading: boolean,
  error: null | any,
  userData: IGetUserData,
}


