export enum loginType {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
}

export interface ILoginData {
  email: string,
  password: string
}
