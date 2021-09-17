import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import authContext from '../../context/AuthContext/authContext';
import { useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  const { isAuthenticated, logout } = useContext(authContext);

  const logoutHandler = () => {
    logout();
    history.push('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push('/')}
          >
            Info Sharing Platform
          </Typography>

          {!isAuthenticated ? (
            <div>
              <Button color="inherit" onClick={() => history.push('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => history.push('/register')}>
                Register
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
