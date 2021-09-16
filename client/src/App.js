import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Worker } from '@react-pdf-viewer/core';
import Navbar from './components/Navbar/Navbar';
import FacultiesPage from './pages/FacultiesPage/FacultiesPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import FacultyById from './pages/FacultyById/FacultyById';
import PrivateRoute from './routing/PrivateRoute/PrivateRoute';
import { useEffect, useContext } from 'react';
import authContext from './context/AuthContext/authContext';

const App = () => {
  let token = localStorage.getItem('authToken');
  const { loadUserData } = useContext(authContext);

  useEffect(() => {
    if (token) {
      loadUserData();
    }

    //eslint-disable-next-line
  }, [token]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <PrivateRoute exact path="/" component={FacultiesPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/faculties/:id" component={FacultyById} />
          </Switch>
        </div>
      </Router>
    </Worker>
  );
};

export default App;
