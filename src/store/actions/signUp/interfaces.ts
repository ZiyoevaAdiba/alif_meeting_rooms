export enum signUpType {
  SIGNUP_REQUEST = 'SIGNUP_REQUEST',
  SIGNUP_FAIL = 'SIGNUP_FAIL',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
}


export interface IUserData {
  name: string,
  lastname: string,
  email: string,
  phone: string,
  department: string,
  tg_account: string,
  password: string,
  role?: string,
}