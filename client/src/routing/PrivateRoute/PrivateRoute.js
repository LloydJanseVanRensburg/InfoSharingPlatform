import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  let hasToken = localStorage.getItem('authToken');

  return (
    <Route
      {...rest}
      render={(props) =>
        !hasToken ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
