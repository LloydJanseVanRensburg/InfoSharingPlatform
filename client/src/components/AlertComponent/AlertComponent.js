import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertComponent = ({
  vertical,
  horizontal,
  open,
  severity,
  message,
  handleClose,
}) => {
  return (
    <Snackbar
      key={vertical + horizontal}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
