import { useState, useContext } from 'react';
import authContext from '../../context/AuthContext/authContext';
import {
  Container,
  TextField,
  makeStyles,
  Typography,
  Button,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [open, setOpen] = useState(false);

  const { registerUser } = useContext(authContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return setOpen(true);
    }

    registerUser({
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

    setOpen(false);
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Please Enter Username, Email, and Password
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterPage;
