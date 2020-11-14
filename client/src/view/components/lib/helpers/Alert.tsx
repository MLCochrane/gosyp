import React from 'react';
import {
  Typography,
  IconButton,
  Paper,
} from '@material-ui/core';
import {
  Close,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

interface AlertProps {
  variant: 'success' | 'error',
  message: string,
  closeHandler: Function,
}

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  }
}));

const Alert = ({
  variant,
  message,
  closeHandler,
}: AlertProps) => {
  const classes = useStyles();

  const backgroundClass = () => {
    switch(variant) {
      case 'success':
        return classes.success;
      case 'error':
        return classes.error;
    }
  }

  return (
    <Paper
      elevation={ 0 }
      className={ backgroundClass() }
    >
      <Typography>
        { message }
      </Typography>
      <IconButton
        aria-label="copy invite link to clipboard"
        onClick={ () => closeHandler() }
        >
        <Close />
      </IconButton>
    </Paper>
  )
}
export default Alert;
