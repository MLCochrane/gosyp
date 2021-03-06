import React from 'react';
import {
  Typography,
  IconButton,
  Paper,
  Grid,
} from '@material-ui/core';
import {
  Close,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

interface AlertProps {
  variant: 'success' | 'error',
  message: string,
  closeAriaLabel: string,
  closeHandler: () => void,
}

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  wrapper: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  closeButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Alert = ({
  variant,
  message,
  closeAriaLabel,
  closeHandler,
}: AlertProps): JSX.Element => {
  const classes = useStyles();

  // eslint-disable-next-line consistent-return
  const backgroundClass = () => {
    switch (variant) {
      case 'success':
        return classes.success;
      case 'error':
        return classes.error;

      // no default
    }
  };

  return (
    <Paper
      elevation={ 0 }
      className={ `${classes.wrapper} ${backgroundClass()}` }
    >
      <Grid container alignItems="center">
        <Grid item>
          <Typography>
            { message }
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            className={ classes.closeButton }
            aria-label={ closeAriaLabel }
            onClick={ () => closeHandler() }
          >
            <Close />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Alert;
