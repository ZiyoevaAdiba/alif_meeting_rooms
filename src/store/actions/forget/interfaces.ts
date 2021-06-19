export enum forgetType {
  FORGET_REQUEST = 'FORGET_REQUEST',
  FORGET_FAIL = 'FORGET_FAIL',
  FORGET_SUCCESS = 'FORGET_SUCCESS',
}

export interface IForgetData {
  email: string,
}
