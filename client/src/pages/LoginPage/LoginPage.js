import { useState } from 'react';
import {
  Container,
  TextField,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <form className={classes.form} noValidate autoComplete="off">
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
          className={classes.input}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
