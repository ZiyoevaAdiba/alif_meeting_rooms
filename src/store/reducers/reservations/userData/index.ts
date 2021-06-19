import { getUserDataType } from "../../../actions/reservations/userData/interfaces";
import { IGetUserDataReducer } from "./interfaces";

const initialState: IGetUserDataReducer = {
  loading: false,
  error: null ,
  userData: {},
};

export const getUserDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getUserDataType.GET_USERS_INFO:
      return {
        ...state,
        loading: true,
        error: null,
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
      };

    case getUserDataType.DATA_DELETE:
      return {
        ...state,
        error: null,
        loading: false,
        userData: {}
      }
    default:
      return state;
  }
}