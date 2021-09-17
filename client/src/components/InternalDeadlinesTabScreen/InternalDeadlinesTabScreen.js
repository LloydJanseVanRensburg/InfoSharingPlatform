import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import * as dayjs from 'dayjs';
import { makeStyles } from '@material-ui/styles';
import { useState, useContext } from 'react';
import facultyContext from '../../context/FacultyContext/facultyContext';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SaveIcon from '@material-ui/icons/Save';
import TabPanel from '../TabPanel/TabPanel';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

const useStyles = makeStyles({
  spinner: {
    textAlign: 'center',
    padding: '2rem 0',
  },
  list: {
    width: '100%',
  },
  listItem: {
    backgroundColor: '#fff',
    margin: '0.5rem 0',
    borderRadius: '5px',
    padding: '1rem',
  },
  dateListAccordion: {
    margin: '2rem 0',
    backgroundColor: '#f5f5f5',
  },
  editViewContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  editViewInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '50%',
    margin: '2.5rem 0',
  },
  actionBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  deleteBtn: {
    border: '1px solid #f44336',
    color: '#f44336',
  },
  accordionDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
});

const InternalDeadlinesTabScreen = ({ value }) => {
  const classes = useStyles();
  const {
    loading,
    internalDeadlines,
    updateInternalDeadline,
    changeInternalDeadline,
    deleteInternalDeadline,
    selectedFaculty,
    addToInternalDeadlines,
  } = useContext(facultyContext);
  const [editID, setEditID] = useState(null);
  const [addDeadlineView, setAddDeadlineView] = useState(false);
  const [newDeadlineDescription, setNewDeadlineDescription] = useState('');
  const [newDeadlineDate, setNewDeadlineDate] = useState(new Date());
  const [addDeadlineLoading, setAddDeadlineLoading] = useState(false);

  const formateInternalDeadlines = () => {
    return internalDeadlines.map((deadline) => ({
      title: deadline.description,
      date: deadline.deadlineDate,
    }));
  };

  const onSaveHandler = async () => {
    let newDeadline = internalDeadlines.filter(
      (deadline) => deadline.id === editID
    )[0];

    if (newDeadline) {
      await updateInternalDeadline(editID, newDeadline);
      setEditID(null);
    }
  };

  const onDeadlineChangeHandler = (e) => {
    let id = editID;
    console.log(e.target);

    let data = {
      [e.target.name]: e.target.value,
    };

    changeInternalDeadline(id, data);
  };

  const onDeadlineDataChangeHandler = (date) => {
    let id = editID;

    let data = {
      deadlineDate: date,
    };
    changeInternalDeadline(id, data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (newDeadlineDescription === '' || !newDeadlineDate) {
      return;
    }

    let dataObj = {
      facultyId: selectedFaculty.id,
      description: newDeadlineDescription,
      deadlineDate: newDeadlineDate,
    };

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setAddDeadlineLoading(true);

    const res = await axios.post(
      `${BASE_URL}/internaldeadlines`,
      dataObj,
      axiosConfig
    );

    addToInternalDeadlines(res.data.newInternalDeadline);
    setNewDeadlineDate(new Date());
    setNewDeadlineDescription('');
    setAddDeadlineLoading(false);
    setAddDeadlineView(false);
  };

  return (
    <TabPanel value={value} index={3}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      <Accordion className={classes.dateListAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>View Date List</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setAddDeadlineView((prev) => !prev)}
            >
              {addDeadlineView ? 'Back' : 'Add Event'}
            </Button>

            {addDeadlineView && (
              <div>
                <form onSubmit={onSubmitHandler}>
                  <MuiPickersUtilsProvider utils={DayjsUtils}>
                    <div className={classes.editViewInputs}>
                      <TextField
                        multiline
                        fullWidth
                        label="Deadline Description"
                        value={newDeadlineDescription}
                        onChange={(e) =>
                          setNewDeadlineDescription(e.target.value)
                        }
                        name="description"
                      />

                      <DatePicker
                        onChange={(date) => setNewDeadlineDate(date)}
                        value={newDeadlineDate}
                        name="deadlineDate"
                      />
                    </div>
                  </MuiPickersUtilsProvider>
                  <Button
                    disabled={addDeadlineLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </form>
              </div>
            )}
          </div>
          <List className={classes.list}>
            {internalDeadlines.map((deadline) => (
              <ListItem className={classes.listItem} key={deadline.id}>
                <ListItemIcon>
                  <EventBusyIcon />
                </ListItemIcon>

                {editID === deadline.id ? (
                  <div className={classes.editViewContainer}>
                    <MuiPickersUtilsProvider utils={DayjsUtils}>
                      <div className={classes.editViewInputs}>
                        <TextField
                          multiline
                          fullWidth
                          label="Deadline Description"
                          value={deadline.description}
                          onChange={onDeadlineChangeHandler}
                          name="description"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />

                        <DatePicker
                          value={deadline.deadlineDate}
                          onChange={onDeadlineDataChangeHandler}
                          name="deadlineDate"
                        />
                      </div>
                    </MuiPickersUtilsProvider>

                    <div>
                      <Button
                        onClick={onSaveHandler}
                        variant="outlined"
                        color="primary"
                      >
                        <SaveIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditID(null)}
                      >
                        <CancelPresentationIcon />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={classes.actionBtns}>
                    <div>
                      <Typography variant="subtitle1" component="p">
                        {deadline.description}
                      </Typography>
                      <Typography variant="subtitle1" component="p">
                        {dayjs(deadline.deadlineDate).format('MMMM D, YYYY')}
                      </Typography>
                    </div>

                    <div>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setEditID(deadline.id)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => deleteInternalDeadline(deadline.id)}
                        variant="outlined"
                        className={classes.deleteBtn}
                      >
                        <DeleteForeverIcon />
                      </Button>
                    </div>
                  </div>
                )}
              </ListItem>
            ))}
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
