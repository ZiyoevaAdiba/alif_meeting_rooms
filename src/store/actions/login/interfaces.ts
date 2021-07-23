export enum loginType {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  RESET_ERRORS = 'RESET_ERRORS'
}

export interface ILoginData {
  email: string,
  password: string
}
