import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext } from 'react';
import facultyContext from '../../context/FacultyContext/facultyContext';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

import TabPanel from '../TabPanel/TabPanel';

const useStyles = makeStyles({
  spinner: {
    textAlign: 'center',
    padding: '2rem 0',
  },
});

const InstitutionalDeadlinesTabScreen = ({ value }) => {
  const classes = useStyles();
  const { loading } = useContext(facultyContext);
  return (
    <TabPanel value={value} index={4}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      {!loading && (
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      )}
    </TabPanel>
  );
};

export default InstitutionalDeadlinesTabScreen;
