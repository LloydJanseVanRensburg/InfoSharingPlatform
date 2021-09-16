import { Container, Typography, makeStyles } from '@material-ui/core';
import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DirectoryTabs from '../../components/DirectoryTabs/DirectoryTabs';
import facultyContext from '../../context/FacultyContext/facultyContext';

const useStyles = makeStyles({
  title: {
    margin: '5rem 0',
    textAlign: 'center',
  },
  mainContainer: {
    position: 'relative',
  },
});

const FacultyById = () => {
  const classes = useStyles();
  const { selectedFaculty, loadFacultyById } = useContext(facultyContext);
  const { id } = useParams();

  useEffect(() => {
    loadFacultyById(id);

    //eslint-disable-next-line
  }, [id]);

  return (
    <Container maxWidth="lg" className={classes.mainContainer}>
      <Typography className={classes.title} variant="h2" component="h1">
        {selectedFaculty?.displayName}
      </Typography>

      <DirectoryTabs />
    </Container>
  );
};

export default FacultyById;
