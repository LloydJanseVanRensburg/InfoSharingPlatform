import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthState from './context/AuthContext/AuthState';
import FacultyState from './context/FacultyContext/FacultyState';

import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C3E90',
    },
    secondary: {
      main: '#01889C',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AuthState>
      <FacultyState>
        <App />
      </FacultyState>
    </AuthState>
  </ThemeProvider>,
  document.getElementById('root')
);
