import { getOptionType } from "../../../actions/reservations/setEditOption/interfaces";
import { IAction } from "../../interfaces";

export interface IOption {
  all: boolean
}
const initialState: IOption = {
  all: false,
};


export const optionReducer = (
  state = initialState,
  action: IAction<IOption>
): IOption => {

  switch (action.type) {
    case getOptionType.SET_CHOOSEN_MODE:
      return {
        ...state,
        all: true ,
      };
      case getOptionType.RESET_CHOOSEN_MODE:
      return {
        ...state,
        all: false ,
      };
    
    default:
      return state;
  }
}