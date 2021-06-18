import { getDepartmentsType } from "../../actions/departments/interfaces";
import { IdepartmentsReducer } from "./interfaces";

const initialState: IdepartmentsReducer = {
  department: {},
  departments: [],
  loading: false,
  error: null,
  showAlert: '',
};


export const departmentsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getDepartmentsType.GET_DEPARTMENTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case getDepartmentsType.GET_DEPARTMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Проверьте доступ. Попробуйте снова',
      };
    case getDepartmentsType.GET_DEPARTMENTS_SUCCESS:
      const payload = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        departments: payload,
      };
    case getDepartmentsType.SHOW_WARNING:
      return{
        ...state,
        showAlert: action.payload
      }
    case getDepartmentsType.CANCEL_DELETE:
      return{
        ...state,
        showAlert: '',
      }
    default:
      return state;
  }
}