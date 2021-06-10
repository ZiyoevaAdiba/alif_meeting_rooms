import { loginType } from "../../actions/login/interfaces";
import { ILoginReducer } from "./interfaces";

const initialState: ILoginReducer = {
  loading: false,
  error: null,
  success: false,
  user_role: '',
};

export const loginReducer = (state = initialState, action: any) => {
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
        error: 'true',
      };
    case loginType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        user_role: action.payload,
      }
    default:
      return state;
  }
}