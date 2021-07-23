import { IUser } from "../../users/interfaces";

export interface IGetUserData {
  active?: boolean,
  id?: string, 
  name?: string,
  last_name?: string,
  department?: {
    id: string,
    name: string
  },
  department_id?: string,
  phone?: string,
  tg_account?: string,
  email?: string,
  password?: string,
  new_password?: string,
  repeat_new_password?: string,
  role?: string,
} 

export interface IGetUserDataReducer {
  loading: boolean,
  error: null | string,
  editError: null | string,
  userData: IUser,
}


