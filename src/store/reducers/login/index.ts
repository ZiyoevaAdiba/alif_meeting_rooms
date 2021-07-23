import { loginType } from "../../actions/login/interfaces";
import { IAction } from "../interfaces";
import { ILoginReducer } from "./interfaces";

const initialState: ILoginReducer = {
  loading: false,
  error: null,
  success: false,
  user_role: '',
};

export const loginReducer = (
  state = initialState,
  action: IAction<string>
): ILoginReducer => {

  switch (action.type) {
    case loginType.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case loginType.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Неправильный пароль или логин. Попробуйте снова.',
      };
    case loginType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        user_role: action.payload,
      };
    case loginType.RESET_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}