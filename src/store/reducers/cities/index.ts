import { getCitiesType } from "../../actions/cities/interfaces";
import { IAction } from "../interfaces";
import { ICity, ICityReducer } from "./interfaces";

const initialState: ICityReducer = {
  city: {},
  cities: [],
  loading: false,
  error: null,
  addError: null,
  editError: null,
  showAlert: '',
};

export const citiesReducer = (
  state = initialState, 
  action: IAction<ICity | ICity[] | string >
  ): ICityReducer => {

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
      const payload = action.payload as ICity[]
      return {
        ...state,
        loading: false,
        error: null,
        cities: payload,
      };
    case getCitiesType.SHOW_CITY:
      return {
        ...state,
        loading: false,
        city: action.payload as ICity,
      };
    case getCitiesType.RESET_EDITING:
      return {
        ...state,
        loading: false,
        city: {},
        editError: null,
      };
    case getCitiesType.EDIT_CITY_FAIL:
      return {
        ...state,
        loading: false,
        editError: action.payload as string,
      };
    case getCitiesType.SHOW_WARNING:
      return {
        ...state,
        showAlert: action.payload as string
      }
    case getCitiesType.CANCEL_DELETE:
      return {
        ...state,
        loading: false,
        showAlert: '',
      }
    case getCitiesType.ADD_CITY_FAIL:
      return {
        ...state,
        loading: false,
        addError: action.payload as string,
      };
    case getCitiesType.RESET_CITIES_ERRORS:
      return {
        ...state,
        addError: null,
        error: null,
        editError: null,
        loading: false,
      };
    default:
      return state;
  }
}