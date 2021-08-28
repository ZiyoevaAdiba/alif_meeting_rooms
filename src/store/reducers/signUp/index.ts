import { signUpType } from "../../actions/signUp/interfaces";
import { IAction } from "../interfaces";
import { ISignUpReducer } from "./interfaces";

const initialState: ISignUpReducer = {
  loading: false,
  error: null,
  success: false,
};

export const signUpReducer = (
  state = initialState,
  action: IAction<string>
): ISignUpReducer => {

  switch (action.type) {
    case signUpType.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case signUpType.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case signUpType.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      }
    case signUpType.RESET_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}