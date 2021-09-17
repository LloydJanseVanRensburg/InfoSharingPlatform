import { useContext } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// Custom Tabs
import EnrolmentsTabScreen from '../EnrolmentsTabScreen/EnrolmentsTabScreen';
import StudentStatusesTabScreen from '../StudentStatusesTabScreen/StudentStatusesTabScreen';
import IndustryDataTabScreen from '../IndustryDataTabScreen/IndustryDataTabScreen';
import InternalDeadlinesTabScreen from '../InternalDeadlinesTabScreen/InternalDeadlinesTabScreen';
import InstitutionalDeadlinesTabScreen from '../InstitutionalDeadlinesTabScreen/InstitutionalDeadlinesTabScreen';
import HistoricPerformanceTabScreen from '../HistoricPerformanceTabScreen/HistoricPerformanceTabScreen';
import EnrolmentStrategiesTabScreen from '../EnrolmentStrategiesTabScreen/EnrolmentStrategiesTabScreen';
import facultyContext from '../../context/FacultyContext/facultyContext';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  tabBar: {
    backgroundColor: '#fff',
  },
}));

function DirectoryTabs() {
  const classes = useStyles();

  const { facultyDirectory, setFacultyDirectory } = useContext(facultyContext);

  const handleChange = (event, newValue) => {
    setFacultyDirectory(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          textColor="secondary"
          className={classes.tabBar}
          value={facultyDirectory}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Enrolments" {...a11yProps(0)} />
          <Tab label="Student Statuses" {...a11yProps(1)} />
          <Tab label="Industry Data" {...a11yProps(2)} />
          <Tab label="Interal Deadlines" {...a11yProps(0)} />
          <Tab label="Institutional Deadlines" {...a11yProps(1)} />
          <Tab label="Historic Performance" {...a11yProps(2)} />
          <Tab label="Enrolment Strategies" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <EnrolmentsTabScreen value={facultyDirectory} />
      <StudentStatusesTabScreen value={facultyDirectory} />
      <IndustryDataTabScreen value={facultyDirectory} />
      <InternalDeadlinesTabScreen value={facultyDirectory} />
      <InstitutionalDeadlinesTabScreen value={facultyDirectory} />
      <HistoricPerformanceTabScreen value={facultyDirectory} />
      <EnrolmentStrategiesTabScreen value={facultyDirectory} />
    </div>
  );
}

export default DirectoryTabs;
