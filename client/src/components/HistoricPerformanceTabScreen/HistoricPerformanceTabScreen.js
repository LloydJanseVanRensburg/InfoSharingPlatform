import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext } from 'react';
import facultyContext from '../../context/FacultyContext/facultyContext';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import TabPanel from '../TabPanel/TabPanel';

const useStyles = makeStyles({
  spinner: {
    textAlign: 'center',
    padding: '2rem 0',
  },
  input: {
    display: 'none',
  },
  pdfContainer: {
    border: '1px solid rgba(0, 0, 0, 0.3)',
    height: '750px',
    minWidth: '400px',
    maxWidth: '50%',
    flex: '1',
  },
  pdfsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  uploadBtnContainer: {
    marginBottom: '1rem',
  },
});

const BASE_URL = 'http://localhost:3001';

const HistoricPerformanceTabScreen = ({ value }) => {
  const classes = useStyles();
  const { loading, historicPerformanceData } = useContext(facultyContext);
  return (
    <TabPanel value={value} index={5}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      {!loading && (
        <div>
          <div className={classes.uploadBtnContainer}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </div>

          <div className={classes.pdfsList}>
            {historicPerformanceData.map((data, idx) => (
              <div className={classes.pdfContainer} key={idx}>
                <Viewer fileUrl={`${BASE_URL}/${data.pdfUrl}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </TabPanel>
  );
};

export default HistoricPerformanceTabScreen;
