import { getUserDataType } from "../../../actions/reservations/userData/interfaces";
import { IAction } from "../../interfaces";
import { IGetUserData, IGetUserDataReducer } from "./interfaces";

const initialState: IGetUserDataReducer = {
  loading: false,
  error: null,
  userData: {},
  editError: null,
};

export const getUserDataReducer = (
  state = initialState,
  action: IAction<IGetUserData>
): IGetUserDataReducer => {

  switch (action.type) {
    case getUserDataType.GET_USERS_INFO:
      return {
        ...state,
        loading: true,
        error: null,
        editError: null,
      };
    case getUserDataType.GET_USERS_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Данные пользователя не найдены. Попробуйте снова.',
      };
    case getUserDataType.GET_USERS_INFO_SUCCESS:
      const payload = action.payload
      return {
        ...state,
        loading: false,
        error: null,
        userData: payload,
        editError: null,
      };
    case getUserDataType.DATA_DELETE:
      return {
        ...state,
        error: null,
        loading: false,
        userData: {}
      };

    case getUserDataType.EDIT_PROFILE_FAIL:
      return {
        ...state,
        error: null,
        loading: false,
        editError: action.payload as string,
      };
    case getUserDataType.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case getUserDataType.RESET_EDITING:
      return {
        ...state,
        error: null,
        editError: null,
        loading: false,
      };

    default:
      return state;
  }
}