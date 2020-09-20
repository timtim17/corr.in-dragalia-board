import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

interface ErrorSnackbarProps {
  show: boolean,
  onClose: () => void
}

function ErrorSnackbar(props: ErrorSnackbarProps) {
  return (
    <Snackbar open={props.show} autoHideDuration={5000} onClose={props.onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={props.onClose} severity="error" elevation={6} variant="filled">
        Something went wrong. Try again later?
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackbar;
