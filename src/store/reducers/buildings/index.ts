import { getBuildingsType } from "../../actions/buildings/interfaces";
import { IBuildingsReducer } from "./interfaces";

const initialState: IBuildingsReducer = {
  building: {},
  buildings: [],
  loading: false,
  buildingsError: null,
  addBuildingError: null,
  editBuildingError: null,
  showAlert: '',
};

export const buildingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getBuildingsType.GET_BUILDINGS:
      return {
        ...state,
        loading: true,
        buildingsError: null,
        editError: null,
        addError: null,      
      };
    case getBuildingsType.GET_BUILDINGS_FAIL:
      return {
        ...state,
        loading: false,
        buildingsError: 'Проверьте доступ. Попробуйте снова',
      };
    case getBuildingsType.GET_BUILDINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        buildingsError: null,
        buildings: action.payload,
      };
    case getBuildingsType.SHOW_BUILDING:
      return {
        ...state,
        building: {
          ...action.payload,
          city_id: action.payload.city.id
        }
      };
    case getBuildingsType.RESET_EDITING:
      return {
        ...state,
        building: {},
        buildingError: null,
      };
    case getBuildingsType.SHOW_WARNING:
      return {
        ...state,
        showAlert: action.payload,
      };
    case getBuildingsType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: '',
      };
    case getBuildingsType.EDIT_BUILDING_FAIL:
      return {
        ...state,
        buildingError: action.payload,
      };
    case getBuildingsType.EDIT_BUILDING_SUCCESS:
      return {
        ...state,
        editBuildingError: null,
        buildingsError: null,
      };
      case getBuildingsType.ADD_BUILDING_FAIL:
      return {
        ...state,
        addError: action.payload,
      };
    case getBuildingsType.RESET_BUILDINGS_ERRORS:
      return {
        ...state,
        buildingsError: null,
        editError: null,
        addError: null,      
      };
    default:
      return state;
  }
}