import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { signUpReducer } from "../reducers/signUp";
import { IusersReducer } from "./users/interfaces";
import { loginReducer } from "./login";
import { ILoginReducer } from "./login/interfaces";
import { usersReducer } from "./users";
import { roomsReducer } from "./rooms";
import { departmentsReducer } from "./departments";
import { reservationsReducer } from "./reservations";
import { ISignUpReducer } from "./signUp/interfaces";
import { IroomsReducer } from "./rooms/interfaces";
import { IdepartmentsReducer } from "./departments/interfaces";
import { IreservationsReducer } from "./reservations/interfaces";
import { IGetUserDataReducer } from "./reservations/userData/interfaces";
import { getUserDataReducer } from "./reservations/userData";
import { getMRsDataReducer } from "./reservations/meetingRoomsData";
import { IMeetingRoomsInfoReducer } from "./reservations/meetingRoomsData/interfaces";
import { IForgetReducer } from "./forget/interfaces";
import { forgetReducer } from "./forget";
import { IEmailConfirmReducer } from "./emailConfirm/interfaces";
import { emailConfirmReducer } from "./emailConfirm";
import { ICityReducer } from "./cities/interfaces";
import { citiesReducer } from "./cities";
import { IBuildingsReducer } from "./buildings/interfaces";
import { buildingsReducer } from "./buildings";
import { History } from "history";
import { IErrorReducer } from "./errorHandler/interfaces";
import { axiosErrorReducer } from "./errorHandler";
import { IOption, optionReducer } from "./reservations/setEditOption";

export interface IRootReducer {
  signUpReducer: ISignUpReducer;
  loginReducer: ILoginReducer;
  forgetReducer: IForgetReducer;
  emailConfirmReducer: IEmailConfirmReducer;
  usersReducer: IusersReducer;
  roomsReducer: IroomsReducer;
  departmentsReducer: IdepartmentsReducer;
  getUserDataReducer: IGetUserDataReducer;
  getMRsDataReducer: IMeetingRoomsInfoReducer;
  reservationsReducer: IreservationsReducer;
  citiesReducer: ICityReducer;
  buildingsReducer: IBuildingsReducer;
  axiosErrorReducer: IErrorReducer;
  optionReducer: IOption;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    signUpReducer,
    loginReducer,
    forgetReducer,
    emailConfirmReducer,
    usersReducer,
    roomsReducer,
    departmentsReducer,
    getUserDataReducer,
    getMRsDataReducer,
    reservationsReducer,
    citiesReducer,
    buildingsReducer,
    axiosErrorReducer,
    optionReducer,
  });
