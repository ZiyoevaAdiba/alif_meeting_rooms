import { signUpType } from "../../actions/signUp/interfaces";
import { ISignUpReducer } from "./interfaces";

const initialState: ISignUpReducer = {
  loading: false,
  error: null,
  success: false,
};

export const signUpReducer = (state = initialState, action: any) => {
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
        error: 'true',
      };
    case signUpType.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      }
    default:
      return state;
  }
}