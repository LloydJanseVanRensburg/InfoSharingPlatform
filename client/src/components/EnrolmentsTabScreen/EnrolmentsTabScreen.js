import {
  Button,
  CircularProgress,
  Fab,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext, useState } from 'react';
import facultyContext from '../../context/FacultyContext/facultyContext';
import SimpleBarChart from '../SimpleBarChart/SimpleBarChart';
import EditIcon from '@material-ui/icons/Edit';
import TabPanel from '../TabPanel/TabPanel';

const useStyles = makeStyles({
  spinner: {
    textAlign: 'center',
    padding: '2rem 0',
  },
  tabContent: {
    display: 'flex',
    margin: '5rem 0',
    '& *': {
      flex: 1,
    },
  },
  fabEditBtn: {
    position: 'absolute',
    bottom: '30px',
    right: '30px',
  },
  infoContainer: {
    display: 'flex',
    gap: '3rem',
    '& *': {
      flex: 1,
    },
  },
});

const EnrolmentsTabScreen = ({ value }) => {
  const classes = useStyles();
  const { loading, enrolments } = useContext(facultyContext);

  const [editView, setEditView] = useState(false);

  const generateEnrolmentChartData = () => {
    let data = [
      {
        name: 'FTUG',
        value: enrolments[0].firstTimeUnderGrads,
      },
      {
        name: 'TUG',
        value: enrolments[0].totalUnderGrads,
      },
      {
        name: 'PGTM',
        value: enrolments[0].postGradsToMasters,
      },
      {
        name: 'Ms',
        value: enrolments[0].masters,
      },
      {
        name: 'Dr',
        value: enrolments[0].doctors,
      },
      {
        name: 'TPG',
        value: enrolments[0].totalPostGrads,
      },
      {
        name: 'OS',
        value: enrolments[0].occasionalStudents,
      },
    ];

    return data;
  };

  const saveEnrolmentHandler = () => {
    setTimeout(() => {
      setEditView(false);
    }, 1500);
  };

  return (
    <TabPanel value={value} index={0}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      <Fab
        onClick={() => setEditView((prev) => !prev)}
        disabled={editView || loading}
        className={classes.fabEditBtn}
        color="secondary"
        aria-label="edit"
      >
        <EditIcon />
      </Fab>

      {!loading && enrolments[0] && (
        <div className={classes.tabContent}>
          <div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">
                First Time Under Graduates
              </Typography>
              {!editView ? (
                <Typography variant="subtitle1">
                  {enrolments[0].firstTimeUnderGrads}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={enrolments[0].firstTimeUnderGrads}
                    required
                    id="standard-required"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">Total Under Graduates</Typography>

              {!editView ? (
                <Typography variant="subtitle1">
                  {enrolments[0].totalUnderGrads}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={enrolments[0].totalUnderGrads}
                    required
                    id="standard-required"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">
                Post Graduates To Masters
              </Typography>

              {!editView ? (
                <Typography variant="subtitle1">
                  {enrolments[0].postGradsToMasters}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={enrolments[0].postGradsToMasters}
                    required
                    id="standard-required"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">Masters</Typography>

              {!editView ? (
                <Typography variant="subtitle1">
                  {enrolments[0].masters}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={enrolments[0].masters}
                    required
                    id="standard-required"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">Doctors</Typography>

              {!editView ? (
                <Typography variant="subtitle1">
                  {enrolments[0].doctors}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={enrolments[0].doctors}
                    required
                    id="standard-required"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">Total Post Graduates</Typography>

              {!editView ? (
                <Typography variant="subtitle1">
                  {enrolments[0].totalPostGrads}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={enrolments[0].totalPostGrads}
                    required
                    id="standard-required"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">Occasional Students</Typography>

              {!editView ? (
                <Typography variant="subtitle1">
                  {enrolments[0].occasionalStudents}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={enrolments[0].occasionalStudents}
                    required
                    id="standard-required"
                  />
                </div>
              )}
            </div>

            {editView && (
              <Button
                onClick={saveEnrolmentHandler}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            )}
          </div>
          <div>
            <SimpleBarChart data={generateEnrolmentChartData()} />
          </div>
        </div>
      )}
    </TabPanel>
  );
};

export default EnrolmentsTabScreen;
