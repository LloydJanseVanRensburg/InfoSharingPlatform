import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import authContext from '../../context/AuthContext/authContext';
import {
  Container,
  TextField,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import AlertComponent from '../../components/AlertComponent/AlertComponent';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '90%',
    maxWidth: '500px',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    margin: '0 auto',
    marginTop: '3rem',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    paddingBottom: '1rem',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { login, isAuthenticated } = useContext(authContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snack, setSnack] = useState({
    horizontal: 'center',
    vertical: 'top',
    severity: 'success',
    message: 'Success',
    open: false,
  });
  const { severity, message, open } = snack;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setSnack({
        ...snack,
        severity: 'error',
        message: 'Please provide email and password',
        open: true,
      });
    }

    login({
      email,
      password,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack({ ...snack, open: false });
  };

  return (
    <Container maxWidth="md">
      <form
        onSubmit={loginSubmitHandler}
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <Typography
          className={classes.title}
          align="center"
          variant="h4"
          component="h2"
        >
          Login
        </Typography>
        <TextField
          className={classes.input}
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          className={classes.input}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button size="large" type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>

      <AlertComponent
        vertical="top"
        horizontal="center"
        open={open}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default LoginPage;
