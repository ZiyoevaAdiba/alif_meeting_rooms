import { getCitiesType } from "../../actions/cities/interfaces";
import { ICityReducer } from "./interfaces";

const initialState: ICityReducer = {
  city: {},
  cities: [],
  loading: false,
  error: null,
  addError: null,
  editError: null,
  showAlert: '',
};

export const citiesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getCitiesType.GET_CITIES:
      return {
        ...state,
        loading: true,
        error: null,
        addError: null,
      };
    case getCitiesType.GET_CITIES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Проверьте доступ. Попробуйте снова.',
      };
    case getCitiesType.GET_CITIES_SUCCESS:
      const payload = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        cities: payload,
      };
    case getCitiesType.SHOW_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case getCitiesType.RESET_EDITING:
      return {
        ...state,
        city: {},
        editError: null,
      };
    case getCitiesType.EDIT_CITY_FAIL:
      return {
        ...state,
        editError: action.payload,
      };
    case getCitiesType.SHOW_WARNING:
      return {
        ...state,
        showAlert: action.payload
      }
    case getCitiesType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: '',
      }
    case getCitiesType.ADD_CITY_FAIL:
      return {
        ...state,
        addError: action.payload,
      };
    case getCitiesType.RESET_CITIES_ERRORS:
      return {
        ...state,
        addError: null,
        error: null,
        editError: null,
      };
    default:
      return state;
  }
}