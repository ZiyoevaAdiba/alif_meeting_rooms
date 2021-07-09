import { forgetType } from "../../actions/forget/interfaces";
import { IAction } from "../interfaces";
import { IForgetReducer  } from "./interfaces";

const initialState: IForgetReducer = {
  loading: false,
  error: null,
  success: false,
};

export const forgetReducer = (
  state = initialState, 
  action: IAction<string>
  ): IForgetReducer => {

  switch (action.type) {
    case forgetType.FORGET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case forgetType.FORGET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case forgetType.FORGET_SUCCESS:
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