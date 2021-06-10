export interface IDepartment {
  name?: string,
  id?: string,
} 

export interface IGetDepartmentsReducer {
  loading: boolean,
  error: null | any,
  departments: IDepartment[],
  department: IDepartment | {},
  showAlert: string,

}

