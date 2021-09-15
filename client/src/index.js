import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthState from './context/AuthContext/AuthState';
import FacultyState from './context/FacultyContext/FacultyState';

ReactDOM.render(
  <AuthState>
    <FacultyState>
      <App />
    </FacultyState>
  </AuthState>,
  document.getElementById('root')
);
