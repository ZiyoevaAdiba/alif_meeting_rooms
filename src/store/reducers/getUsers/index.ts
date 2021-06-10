import { getUsersType } from "../../actions/getUsers/interfaces";
import { IGetUsersReducer } from "./interfaces";

const initialState: IGetUsersReducer = {
  user: {},
  users: [],
  pageCount: 1,
  loading: false,
  error: null,
  showAlert: '',
};

export const getUsersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getUsersType.GET_USERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case getUsersType.GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'true',
      };
    case getUsersType.GET_USERS_SUCCESS:
      const { users, count_page } = action.payload
      return {
        ...state,
        loading: false,
        error: null,
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
        user: {}
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
      }
    default:
      return state;
  }
}