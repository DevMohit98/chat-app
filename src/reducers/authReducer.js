import { ActionTypes } from "../Constants/action-types";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  authenticating: false,
  authenticated: false,
  error: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.USER_LOGIN}_REQUEST`:
      state = {
        ...state,
        authenticating: false,
      };
      break;
    case `${ActionTypes.USER_LOGIN}_SUCCESS`:
      state = {
        ...state,
        ...action.payload.user,
        authenticated: true,
        authenticating: false,
      };
      break;
    case `${ActionTypes.USER_LOGIN}_FAILURE`:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
        error: action.payload.error,
      };
      break;
    case `${ActionTypes.USER_LOGOUT}_REQUEST`:
      break;
    case `${ActionTypes.USER_LOGOUT}_SUCCESS`:
      state = {
        ...initialState,
      };
      break;
    case `${ActionTypes.USER_LOGOUT}_FAILURE`:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    default:
      return state;
  }
  return state;
};
