export interface ILoginReducer {
  loading: boolean,
  error: null | string,
  success: boolean,
  user_role: string,
}