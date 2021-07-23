export enum signUpType {
  SIGNUP_REQUEST = 'SIGNUP_REQUEST',
  SIGNUP_FAIL = 'SIGNUP_FAIL',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  RESET_ERRORS = 'RESET_ERRORS'
}


interface IUserDeparment {
  id?: string,
  name?: string
}

export interface IUserData {
  name: string,
  last_name: string,
  email: string,
  phone: string,
  department?: IUserDeparment,
  department_id?: string,
  tg_account: string,
  password: string,
  role?: string,
}