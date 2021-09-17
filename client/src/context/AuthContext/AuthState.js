import { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import * as actionTypes from './auth-types';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

const AuthState = ({ children }) => {
  const initState = {
    loading: false,
    isAuthenticated: false,
    userData: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initState);

  const login = async (loginData) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({ type: actionTypes.LOGIN_USER_LOADING });

      const res = await axios.post(
        `${BASE_URL}/users/login`,
        loginData,
        axiosConfig
      );

      dispatch({
        type: actionTypes.LOGIN_USER_SUCCESS,
        payload: res.data.user,
      });

      localStorage.setItem('authToken', res.data.token);
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  const register = async (registerData) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      dispatch({ type: actionTypes.REGISTER_USER_LOADING });

      const res = await axios.post(
        `${BASE_URL}/users/register`,
        registerData,
        axiosConfig
      );

      dispatch({
        type: actionTypes.REGISTER_USER_SUCCESS,
        payload: res.data.user,
      });

      localStorage.setItem('authToken', res.data.token);
    } catch (error) {
      dispatch({
        type: actionTypes.REGISTER_USER_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  const loadUserData = async () => {
    const axiosConfig = {
      params: {
        token: localStorage.getItem('authToken'),
      },
    };

    try {
      dispatch({
        type: actionTypes.LOAD_USERDATA_LOADING,
      });

      const res = await axios.get(`${BASE_URL}/users/me`, axiosConfig);

      dispatch({
        type: actionTypes.LOAD_USERDATA_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.LOAD_USERDATA_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT_USER });
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        userData: state.userData,
        isAuthenticated: state.isAuthenticated,
        login,
        loadUserData,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
