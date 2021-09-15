import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext } from 'react';
import facultyContext from '../../context/FacultyContext/facultyContext';

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

      {!loading && <h3>This should show data</h3>}
    </TabPanel>
  );
};

export default InstitutionalDeadlinesTabScreen;
