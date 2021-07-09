export interface IUser {
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
  role?: string,
}

export interface IusersReducer {
  loading: boolean,
  userError: null | string,
  usersError: null | string,
  users: IUser[],
  user: IUser, 
  showAlert: string,
  pageCount: number,
}