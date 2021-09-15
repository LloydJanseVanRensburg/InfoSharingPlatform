import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import facultyContext from '../../context/FacultyContext/facultyContext';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5rem',
    paddingTop: '5rem',
    alignItems: 'center',
    height: 'calc(100vh - 64px)',
  },
  cardBtn: {
    width: '100%',
    color: theme.palette.text.secondary,
    padding: '0',
  },
  paper: {
    textAlign: 'center',
    width: '100%',
    height: '200px',
    display: 'flex',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
  title: {
    width: '100%',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    fontSize: '0.8rem',
    color: '#fff',
  },
}));

const FacultiesPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { fetchFaculties, setSelectedFaculty, faculties, loading } =
    useContext(facultyContext);

  useEffect(() => {
    if (faculties.length === 0) {
      fetchFaculties();
    }

    //eslint-disable-next-line
  }, [faculties]);

  const handleViewFaculty = (e, faculty) => {
    setSelectedFaculty(faculty);
    history.push(`/faculties/${faculty.id}`);
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Typography variant="h2" component="h1">
        Faculties
      </Typography>

      {loading && <CircularProgress />}

      <Grid container spacing={3}>
        {!loading &&
          faculties.map((faculty) => (
            <Grid item xs={12} sm={6} md={3} key={faculty.id}>
              <Button className={classes.cardBtn}>
                <Paper
                  className={classes.paper}
                  onClick={(e) => handleViewFaculty(e, faculty)}
                >
                  <p className={classes.title}>{faculty.displayName}</p>
                </Paper>
              </Button>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default FacultiesPage;
