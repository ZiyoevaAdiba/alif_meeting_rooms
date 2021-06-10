import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { signUpReducer } from '../reducers/signUp'
import { IGetUsersReducer } from './getUsers/interfaces';
import { loginReducer } from './login';
import { ILoginReducer } from './login/interfaces';
import { getUsersReducer } from './getUsers';
import { getRoomsReducer } from './getRooms';
import { getDepartmentsReducer } from './departments';
import { getReservationsReducer } from './reservations';
import { ISignUpReducer } from './signUp/interfaces';
import { IGetRoomsReducer } from './getRooms/interfaces';
import { IGetDepartmentsReducer } from './departments/interfaces';
import { IGetReservationsReducer } from './reservations/interfaces';
import { IGetUserDataReducer } from './reservations/userData/interfaces';
import { getUserDataReducer } from './reservations/userData'
import { getMRsDataReducer } from './reservations/meetingRoomsData';
import { IGetMeetingRoomInfoReducer } from './reservations/meetingRoomsData/interfaces';

export interface IRootReducer {
    signUpReducer: ISignUpReducer,
    loginReducer: ILoginReducer,
    getUsersReducer: IGetUsersReducer,
    getRoomsReducer: IGetRoomsReducer,
    getDepartmentsReducer: IGetDepartmentsReducer,
    getUserDataReducer: IGetUserDataReducer,
    getMRsDataReducer: IGetMeetingRoomInfoReducer,
    getReservationsReducer: IGetReservationsReducer,
}

export const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    signUpReducer,
    loginReducer,
    getUsersReducer,
    getRoomsReducer,
    getDepartmentsReducer,
    getUserDataReducer,
    getMRsDataReducer,
    getReservationsReducer,
});