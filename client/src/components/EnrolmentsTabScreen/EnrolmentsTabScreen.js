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

const EnrolmentsTabScreen = ({ value }) => {
  const classes = useStyles();
  const { loading, enrolments } = useContext(facultyContext);

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

  return (
    <TabPanel value={value} index={0}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      {!loading && enrolments[0] && (
        <div className={classes.tabContent}>
          <div>
            <p>
              First Time Under Graduates - {enrolments[0].firstTimeUnderGrads}
            </p>
            <p>Total Under Graduates - {enrolments[0].totalUnderGrads}</p>
            <p>
              Post Graduates To Masters - {enrolments[0].postGradsToMasters}
            </p>
            <p>Masters - {enrolments[0].masters}</p>
            <p>Doctors - {enrolments[0].doctors}</p>
            <p>Total Post Graduates - {enrolments[0].totalPostGrads}</p>
            <p>Occasional Students - {enrolments[0].occasionalStudents}</p>
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
