import * as actionTypes from './auth-types';

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_LOADING:
    case actionTypes.LOAD_USERDATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_USER_SUCCESS:
    case actionTypes.LOAD_USERDATA_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        userData: action.payload,
      };
    case actionTypes.LOGIN_USER_ERROR:
    case actionTypes.LOAD_USERDATA_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        userData: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
