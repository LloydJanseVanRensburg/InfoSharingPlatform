import * as actionTypes from './auth-types';

const authReducer = (state, action) => {
  switch (action.payload) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
