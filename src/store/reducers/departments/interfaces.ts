export interface IDepartment {
  name?: string,
  id?: string,
} 

export interface IdepartmentsReducer {
  loading: boolean,
  error: null | string,
  addError: null | string,
  editError: null | string,
  departments: IDepartment[],
  department: IDepartment,
  showAlert: string,

}

