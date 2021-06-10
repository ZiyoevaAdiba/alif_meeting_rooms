import { getDepartmentsType } from "../../actions/departments/interfaces";
import { IGetDepartmentsReducer } from "./interfaces";

const initialState: IGetDepartmentsReducer = {
  department: {},
  departments: [],
  loading: false,
  error: null,
  showAlert: '',
};


export const getDepartmentsReducer = (state = initialState, action: any) => {
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
        error: 'true',
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