import { getDepartmentsType } from "../../actions/departments/interfaces";
import { IAction } from "../interfaces";
import { IDepartment, IdepartmentsReducer } from "./interfaces";

const initialState: IdepartmentsReducer = {
  department: {},
  departments: [],
  loading: false,
  error: null,
  addError: null,
  editError: null,
  showAlert: "",
};

export const departmentsReducer = (
  state = initialState,
  action: IAction<IDepartment | IDepartment[] | string>
): IdepartmentsReducer => {
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
        error: "Проверьте доступ. Попробуйте снова.",
      };
    case getDepartmentsType.GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        departments: action.payload as IDepartment[],
      };
    case getDepartmentsType.SHOW_DEPARTMENT:
      return {
        ...state,
        loading: false,
        department: action.payload as IDepartment,
      };
    case getDepartmentsType.RESET_EDITING:
      return {
        ...state,
        loading: false,
        department: {},
        editError: null,
      };
    case getDepartmentsType.EDIT_DEP_FAIL:
      return {
        ...state,
        loading: false,
        editError: action.payload as string,
      };
    case getDepartmentsType.SHOW_WARNING:
      return {
        ...state,
        loading: false,
        showAlert: action.payload as string,
      };
    case getDepartmentsType.CANCEL_DELETE:
      return {
        ...state,
        loading: false,
        showAlert: "",
      };
    case getDepartmentsType.ADD_DEP_FAIL:
      return {
        ...state,
        loading: false,
        addError: action.payload as string,
      };
    case getDepartmentsType.RESET_DEPARTMENTS_ERRORS:
      return {
        ...state,
        loading: false,
        addError: null,
        error: null,
        editError: null,
      };
    default:
      return state;
  }
};
