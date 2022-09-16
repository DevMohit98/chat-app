import { ActionTypes } from "../Constants/action-types";
const initialState = {
  user: [],
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ActionTypes.REAL_TIME_USER}_REQUEST`:
      break;
    case `${ActionTypes.REAL_TIME_USER}_SUCCESS`:
      state = {
        ...state,
        user: action.payload.users,
      };
      break;
    case `${ActionTypes.REAL_TIME_USER}_FAILURE`:
      break;
  }
  return state;
};
