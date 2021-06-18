export interface IDepartment {
  name?: string,
  id?: string,
} 

export interface IdepartmentsReducer {
  loading: boolean,
  error: null | any,
  departments: IDepartment[],
  department: IDepartment | {},
  showAlert: string,

}

