import { errorType } from "../../actions/errorHandler/interfaces";
import { IAction } from "../interfaces";
import { IErrorReducer } from "./interfaces";

const initialState: IErrorReducer = {
  openErrorModal: false,
};

export const axiosErrorReducer = (
  state = initialState,
  action: IAction<boolean>
): IErrorReducer => {
  switch (action.type) {
    case errorType.OPEN_DIALOG:
      return {
        openErrorModal: true,
      };
    default:
      return state;
  }
};
