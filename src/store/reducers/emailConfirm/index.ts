import { emailType } from "../../actions/emailConfirm/interfaces";
import { IAction } from "../interfaces";
import { IEmailConfirmReducer } from "./interfaces";

const initialState: IEmailConfirmReducer = {
  loading: true,
  error: false,
  success: false,
  exist: null,
};

export const emailConfirmReducer = (
  state = initialState, 
  action: IAction<boolean>
  ): IEmailConfirmReducer => {

  switch (action.type) {
    case emailType.EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        exist: null,
      };
    case emailType.EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        exist: null,
      };
    case emailType.EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        exist: action.payload,
      }
    default:
      return state;
  }
}