import { Button, CircularProgress, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext, useState } from 'react';
import facultyContext from '../../context/FacultyContext/facultyContext';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PdfViewerComponent from '../PdfViewerComponent/PdfViewerComponent';
import axios from 'axios';
import TabPanel from '../TabPanel/TabPanel';
import Alert from '@material-ui/lab/Alert/Alert';

const useStyles = makeStyles({
  spinner: {
    textAlign: 'center',
    padding: '2rem 0',
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
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#ddd',
    width: 'fit-content',
  },
});

const BASE_URL = 'http://localhost:3001';

const IndustryDataTabScreen = ({ value }) => {
  const classes = useStyles();
  const [indsutryDataPdfFile, setIndsutryDataPdfFile] = useState('');
  const [snack, setSnack] = useState({
    severity: 'success',
    message: 'Success',
    open: false,
  });

  const { loading, industryData, selectedFaculty, loadIndustryData } =
    useContext(facultyContext);

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    console.log(file.name);
    setIndsutryDataPdfFile(file);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('pdf', indsutryDataPdfFile, indsutryDataPdfFile.name);
    formData.append('facultyId', selectedFaculty.id);

    try {
      await axios.post(`${BASE_URL}/api/v1/industrydata`, formData);
      setSnack({
        severity: 'success',
        message: 'Successfully uploaded file',
        open: true,
      });

      loadIndustryData(selectedFaculty.id);
    } catch (error) {
      setSnack({
        severity: 'error',
        message: 'Somethiung went wrong',
        open: true,
      });
      console.error('Something went wrong with file upload', error.repsonse);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };

  return (
    <TabPanel value={value} index={2}>
      {loading && (
        <div className={classes.spinner}>
          <CircularProgress color="secondary" />
        </div>
      )}

      {!loading && (
        <div>
          <div className={classes.uploadBtnContainer}>
            <input
              className={classes.input}
              id="contained-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <Button
              onClick={uploadFile}
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </div>

          <div className={classes.pdfsList}>
            {industryData.map((data, idx) => (
              <div className={classes.pdfContainer} key={idx}>
                <PdfViewerComponent fileUrl={`${BASE_URL}/${data.pdfUrl}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </TabPanel>
  );
};

export default IndustryDataTabScreen;
