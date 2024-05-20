// CustomSnackbar.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ open, message, severity, onClose, position, size }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={position}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: size }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;