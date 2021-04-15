import React, {
  useState,
  useRef,
} from 'react';
import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Snackbar,
  Tooltip,
} from '@material-ui/core';
import {
  FileCopy,
} from '@material-ui/icons';
import { RoomDetailsUpdated } from 'view/components/lib/events/rooms';
import Alert from 'view/components/lib/helpers/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  message: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: '1.25em',
  },
}));

const ShareLink = (): JSX.Element => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [roomDetails] = RoomDetailsUpdated();
  const inputRef = useRef<HTMLDivElement>(null);

  const generateLink = () => {
    const [roomID] = roomDetails;
    const host = process.env.NODE_ENV === 'production' ? window.location.origin : process.env.REACT_APP_CLIENT_URL;
    return roomID ? `${host}?roomId=${roomID.value}` : '';
  };

  const handleClickCopy = () => {
    if (inputRef != null && inputRef.current != null) {
      const input = inputRef.current.querySelector('input');
      if (!input) return;
      input.select();
      document.execCommand('copy');
      input.blur();
      setSnackbarOpen(true);
    }
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper
      elevation={ 0 }
    >
      <Typography
        variant="h5"
        component="p"
        className={ classes.message }
      >
        {
        'Chatting is better with friends! '
        + 'Share the invite link below to encourage others to join your room.'
        }
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="Share Link"
        id="share-link"
        value={ generateLink() }
        ref={ inputRef }
        InputProps={ {
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Copy invite link">
                <IconButton
                  aria-label="copy invite link to clipboard"
                  onClick={ handleClickCopy }
                >
                  <FileCopy />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        } }
      />
      <Snackbar
        open={ snackbarOpen }
        // autoHideDuration={6000}
        onClose={ handleClose }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'left' } }
      >
        <Alert
          variant="success"
          message="Copied to clipboard"
          closeAriaLabel="close alert"
          closeHandler={ handleClose }
        />
      </Snackbar>
    </Paper>
  );
};
export default ShareLink;
