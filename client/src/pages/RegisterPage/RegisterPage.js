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

const RegisterPage = () => {
  const classes = useStyles();

  // Component State
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snack, setSnack] = useState({
    vertical: 'top',
    horizontal: 'center',
    open: false,
    severity: 'success',
    message: 'Success',
  });

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/');
    }
  }, [history]);

  const { open, severity, message } = snack;

  const { register, isAuthenticated } = useContext(authContext);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return setSnack({
        ...snack,
        message: 'Please provide all fields',
        severity: 'error',
        open: true,
      });
    }

    register({
      username,
      email,
      password,
    });
    console.log('sending ajax request to register');
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
        onSubmit={onSubmitHandler}
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
          Register
        </Typography>
        <TextField
          className={classes.input}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className={classes.input}
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.input}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button size="large" type="submit" variant="contained" color="primary">
          Register
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

export default RegisterPage;
