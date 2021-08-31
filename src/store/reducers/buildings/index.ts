import { getBuildingsType } from "../../actions/buildings/interfaces";
import { IAction } from "../interfaces";
import { IBuilding, IBuildingsReducer } from "./interfaces";

const initialState: IBuildingsReducer = {
  building: {},
  buildings: [],
  loading: false,
  buildingsError: null,
  addBuildingError: null,
  editBuildingError: null,
  showAlert: '',
};

export const buildingsReducer = (
  state = initialState, 
  action: IAction<IBuilding | IBuilding[] | string>
  ): IBuildingsReducer => {

  switch (action.type) {
    case getBuildingsType.GET_BUILDINGS:
      return {
        ...state,
        loading: true,
        buildingsError: null,
        editBuildingError: null,
        addBuildingError: null,      
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
        buildings: action.payload as IBuilding[],
      };
    case getBuildingsType.SHOW_BUILDING:
      const { city } = action.payload as IBuilding
      return {
        ...state,
        loading: false,
        building: {
          ...action.payload as IBuilding,
          city_id: city?.id
        }
      };
    case getBuildingsType.RESET_EDITING:
      return {
        ...state,
        building: {},
        buildingsError: null,
        loading: false,
      };
    case getBuildingsType.SHOW_WARNING:
      return {
        ...state,
        showAlert: action.payload as string,
        loading: false,
      };
    case getBuildingsType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: '',
        loading: false,
      };
    case getBuildingsType.EDIT_BUILDING_FAIL:
      return {
        ...state,
        editBuildingError: action.payload as string,
        loading: false,
      };
    
      case getBuildingsType.ADD_BUILDING_FAIL:
      return {
        ...state,
        loading: false,
        addBuildingError: action.payload as string,
      };
    case getBuildingsType.RESET_BUILDINGS_ERRORS:
      return {
        ...state,
        buildingsError: null,
        editBuildingError: null,
        addBuildingError: null, 
        loading: false,     
      };
    default:
      return state;
  }
}