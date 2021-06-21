import { getDepartmentsType } from "../../actions/departments/interfaces";
import { IdepartmentsReducer } from "./interfaces";

const initialState: IdepartmentsReducer = {
  department: {},
  departments: [],
  loading: false,
  error: null,
  addError: null,
  showAlert: '',
};


export const departmentsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getDepartmentsType.GET_DEPARTMENTS:
      return {
        ...state,
        loading: true,
        error: null,
        addError: null,
      };
    case getDepartmentsType.GET_DEPARTMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Проверьте доступ. Попробуйте снова.',
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
      return {
        ...state,
        showAlert: action.payload
      }
    case getDepartmentsType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: '',
      }
    case getDepartmentsType.ADD_DEP_FAIL:
      return {
        ...state,
        addError: action.payload,
      };
    case getDepartmentsType.RESET_DEPARTMENTS_ERRORS:
      return {
        ...state,
        addError: null,
        error: null,
      };
    default:
      return state;
  }
}