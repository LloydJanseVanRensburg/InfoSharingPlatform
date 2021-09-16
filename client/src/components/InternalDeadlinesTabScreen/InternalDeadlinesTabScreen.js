import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext } from 'react';
import facultyContext from '../../context/FacultyContext/facultyContext';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';

import TabPanel from '../TabPanel/TabPanel';

const useStyles = makeStyles({
  spinner: {
    textAlign: 'center',
    padding: '2rem 0',
  },
});

const InternalDeadlinesTabScreen = ({ value }) => {
  const classes = useStyles();
  const { loading, internalDeadlines } = useContext(facultyContext);

  const formateInternalDeadlines = () => {
    return internalDeadlines.map((deadline) => ({
      title: deadline.description,
      date: deadline.deadlineDate,
    }));
  };

  return (
    <TabPanel value={value} index={3}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {!loading && (
        <FullCalendar
          events={formateInternalDeadlines()}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
        />
      )}
    </TabPanel>
  );
};

export default InternalDeadlinesTabScreen;
