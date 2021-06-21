import { getUsersType } from "../../actions/users/interfaces";
import { IusersReducer } from "./interfaces";

const initialState: IusersReducer = {
  user: {},
  users: [],
  pageCount: 1,
  loading: false,
  usersError: null,
  userError: null,
  showAlert: '',
};

export const usersReducer = (state = initialState, action: any) => {
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
      const { users, count_page } = action.payload
      return {
        ...state,
        loading: false,
        usersError: null,
        users,
        pageCount: count_page
      };
    case getUsersType.SHOW_USER:
      return {
        ...state,
        user: action.payload,
      };
    case getUsersType.RESET_EDITING:
      return {
        ...state,
        user: {},
        userError: null,
      };
    case getUsersType.SHOW_WARNING:
      return {
        ...state,
        showAlert: action.payload,
      };
    case getUsersType.CANCEL_DELETE:
      return {
        ...state,
        showAlert: '',
      };
    case getUsersType.EDIT_USER_FAIL:
      return {
        ...state,
        userError: action.payload,
      };
    case getUsersType.EDIT_USER_SUCCESS:
      return {
        ...state,
        userError: null,
        usersError: null,
      };
    default:
      return state;
  }
}