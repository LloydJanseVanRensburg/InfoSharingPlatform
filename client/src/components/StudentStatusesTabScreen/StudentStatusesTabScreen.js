import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext } from 'react';
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
    gap: '10rem',
    margin: '5rem 0',
  },
});

const StudentStatusesTabScreen = ({ value }) => {
  const classes = useStyles();
  const { loading, studentStatuses } = useContext(facultyContext);

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

  return (
    <TabPanel value={value} index={1}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      {!loading && studentStatuses[0] && (
        <div className={classes.tabContent}>
          <div>
            <p>Accepted Students - {studentStatuses[0].acceptedStudents}</p>
            <p>Bursary Students - {studentStatuses[0].bursaryStudents}</p>
            <p>High APS Students - {studentStatuses[0].highAPSStudents}</p>
            <p>
              Hostel Acceptance Students -{' '}
              {studentStatuses[0].hostelAcceptanceStudents}
            </p>
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
