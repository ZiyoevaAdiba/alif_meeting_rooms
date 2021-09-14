import { getUsersType } from "../../actions/users/interfaces";
import { IAction } from "../interfaces";
import { IUser, IusersReducer } from "./interfaces";

const initialState: IusersReducer = {
  user: {},
  users: [],
  pageCount: 1,
  loading: false,
  usersError: null,
  userError: null,
  showAlert: '',
};

interface IPayload {
  users: IUser[],
  count_page: number,
}

export const usersReducer = (
  state = initialState, 
  action: IAction<IUser[] | IUser | string | IPayload>
  ): IusersReducer  => {

  switch (action.type) {
    case getUsersType.GET_USERS:
      return {
        ...state,
        loading: true,
        usersError: null,
        userError: null
      };
    case getUsersType.GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        usersError: 'Проверьте доступ. Попробуйте снова',
      };
    case getUsersType.GET_USERS_SUCCESS:
      const { users, count_page } = action.payload as IPayload;
      return {
        ...state,
        loading: false,
        usersError: null,
        users,
        pageCount: count_page
      };
    case getUsersType.SHOW_USER:
      const { department } = action.payload as IUser;
      return {
        ...state,
        loading: false,
        user: {
          ...action.payload as IUser,
          department_id: department?.id
        }
      };
    case getUsersType.RESET_EDITING:
      return {
        ...state,
        loading: false,
        user: {},
        userError: null,
      };
    case getUsersType.SHOW_WARNING:
      return {
        ...state,
        loading: false,
        showAlert: action.payload as string,
      };
    case getUsersType.CANCEL_DELETE:
      return {
        ...state,
        loading: false,
        showAlert: '',
      };
    case getUsersType.EDIT_USER_FAIL:
      return {
        ...state,
        loading: false,
        userError: action.payload as string,
      };
    case getUsersType.EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userError: null,
        usersError: null,
      };
    default:
      return state;
  }
}