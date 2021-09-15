import { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = ({ children }) => {
  const initState = {
    loading: false,
    userData: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initState);

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        userData: state.userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
