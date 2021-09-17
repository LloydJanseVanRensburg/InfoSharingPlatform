import EditIcon from '@material-ui/icons/Edit';
import {
  Button,
  CircularProgress,
  Fab,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState, useContext } from 'react';
import facultyContext from '../../context/FacultyContext/facultyContext';
import SimpleBarChart from '../SimpleBarChart/SimpleBarChart';

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

const StudentStatusesTabScreen = ({ value }) => {
  const classes = useStyles();

  const {
    loading,
    studentStatuses,
    updateStudentStatuses,
    changeStudentStatuses,
    selectedFaculty,
  } = useContext(facultyContext);

  const [editView, setEditView] = useState(false);

  const generateStudentStatusesChartData = () => {
    let data = [
      {
        name: 'Accepted',
        value: studentStatuses[0].acceptedStudents,
      },
      {
        name: 'Bursary',
        value: studentStatuses[0].bursaryStudents,
      },
      {
        name: 'High APS',
        value: studentStatuses[0].highAPSStudents,
      },
      {
        name: 'Hostel Acceptance',
        value: studentStatuses[0].hostelAcceptanceStudents,
      },
    ];

    return data;
  };

  const saveStudentStatusesHandler = async () => {
    if (
      !studentStatuses[0].acceptedStudents ||
      !studentStatuses[0].bursaryStudents ||
      !studentStatuses[0].highAPSStudents ||
      !studentStatuses[0].hostelAcceptanceStudents
    ) {
      return;
    }

    await updateStudentStatuses(studentStatuses[0].id, {
      facultyId: selectedFaculty.id,
      acceptedStudents: studentStatuses[0].acceptedStudents,
      bursaryStudents: studentStatuses[0].bursaryStudents,
      highAPSStudents: studentStatuses[0].highAPSStudents,
      hostelAcceptanceStudents: studentStatuses[0].hostelAcceptanceStudents,
    });

    setEditView(false);
  };

  const studentStatusesDataChangeHandler = (e) => {
    changeStudentStatuses(e.target.name, e.target.value);
  };

  return (
    <TabPanel value={value} index={1}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      {studentStatuses.length > 0 && (
        <Fab
          onClick={() => setEditView((prev) => !prev)}
          disabled={editView || loading}
          className={classes.fabEditBtn}
          color="secondary"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
      )}

      {!loading && studentStatuses[0] && (
        <div className={classes.tabContent}>
          <div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">Accepted Students</Typography>
              {!editView ? (
                <Typography variant="subtitle1">
                  {studentStatuses[0].acceptedStudents}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={studentStatuses[0].acceptedStudents}
                    required
                    id="standard-required"
                    onChange={studentStatusesDataChangeHandler}
                    name="acceptedStudents"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">Bursary Students</Typography>
              {!editView ? (
                <Typography variant="subtitle1">
                  {studentStatuses[0].bursaryStudents}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={studentStatuses[0].bursaryStudents}
                    required
                    id="standard-required"
                    onChange={studentStatusesDataChangeHandler}
                    name="bursaryStudents"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">High APS Students</Typography>
              {!editView ? (
                <Typography variant="subtitle1">
                  {studentStatuses[0].highAPSStudents}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={studentStatuses[0].highAPSStudents}
                    required
                    id="standard-required"
                    onChange={studentStatusesDataChangeHandler}
                    name="highAPSStudents"
                  />
                </div>
              )}
            </div>
            <div className={classes.infoContainer}>
              <Typography variant="subtitle1">
                Hostel Acceptance Students
              </Typography>
              {!editView ? (
                <Typography variant="subtitle1">
                  {studentStatuses[0].hostelAcceptanceStudents}
                </Typography>
              ) : (
                <div>
                  <TextField
                    value={studentStatuses[0].hostelAcceptanceStudents}
                    required
                    id="standard-required"
                    onChange={studentStatusesDataChangeHandler}
                    name="hostelAcceptanceStudents"
                  />
                </div>
              )}
            </div>

            {editView && (
              <Button
                onClick={saveStudentStatusesHandler}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            )}
          </div>
          <div>
            <SimpleBarChart data={generateStudentStatusesChartData()} />
          </div>
        </div>
      )}
    </TabPanel>
  );
};

export default StudentStatusesTabScreen;
