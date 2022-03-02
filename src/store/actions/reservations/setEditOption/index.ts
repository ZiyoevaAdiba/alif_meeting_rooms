import { getOptionType } from "./interfaces";

export const setChoosenMode = () => {
  return {
    type: getOptionType.SET_CHOOSEN_MODE,
    payload: {},
  };
};


export const resetChoosenMode = () => {
  return {
    type: getOptionType.RESET_CHOOSEN_MODE,
    payload: {},
  };
};