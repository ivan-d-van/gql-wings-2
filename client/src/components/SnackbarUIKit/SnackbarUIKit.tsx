import React from "react";
import {Alert, Snackbar, SnackbarOrigin} from "@mui/material";

const snackbarOptions:  SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center'
}

interface SnackbarUIKitProp {
  message: string;
  autoHideDuration: number;
  open: boolean;
  onClose: () => void;
}

export const SnackbarUIKit: React.FC<SnackbarUIKitProp> = (props) => {
  const {message, open, onClose, autoHideDuration} = props

  return (
    <Snackbar
      anchorOrigin={snackbarOptions}
      message={message}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={onClose}
    >
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  )
}
