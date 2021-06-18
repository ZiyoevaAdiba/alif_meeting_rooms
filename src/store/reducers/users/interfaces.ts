export interface IUser {
  active?: boolean,
  id?: string, 
  name?: string,
  lastname?: string,
  deparment?: string,
  phone?: string,
  tg_account?: string,
  email?: string,
  password?: string,
  role?: string,
}

export interface IusersReducer {
  loading: boolean,
  error: null | any,
  users: IUser[],
  user: IUser | {},
  showAlert: string,
  pageCount: number,
}