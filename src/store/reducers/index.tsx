import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { signUpReducer } from '../reducers/signUp'
import { IusersReducer } from './users/interfaces';
import { loginReducer } from './login';
import { ILoginReducer } from './login/interfaces';
import { usersReducer } from './users';
import { roomsReducer } from './rooms';
import { departmentsReducer } from './departments';
import { reservationsReducer } from './reservations';
import { ISignUpReducer } from './signUp/interfaces';
import { IroomsReducer } from './rooms/interfaces';
import { IdepartmentsReducer } from './departments/interfaces';
import { IreservationsReducer } from './reservations/interfaces';
import { IGetUserDataReducer } from './reservations/userData/interfaces';
import { getUserDataReducer } from './reservations/userData'
import { getMRsDataReducer } from './reservations/meetingRoomsData';
import { IMeetingRoomsInfoReducer } from './reservations/meetingRoomsData/interfaces';
import { IForgetReducer } from './forget/interfaces';
import { forgetReducer } from './forget';


export interface IRootReducer {
    signUpReducer: ISignUpReducer,
    loginReducer: ILoginReducer,
    forgetReducer: IForgetReducer,
    usersReducer: IusersReducer,
    roomsReducer: IroomsReducer,
    departmentsReducer: IdepartmentsReducer,
    getUserDataReducer: IGetUserDataReducer,
    getMRsDataReducer: IMeetingRoomsInfoReducer,
    reservationsReducer: IreservationsReducer,
}

export const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    signUpReducer,
    loginReducer,
    forgetReducer,
    usersReducer,
    roomsReducer,
    departmentsReducer,
    getUserDataReducer,
    getMRsDataReducer,
    reservationsReducer,
});