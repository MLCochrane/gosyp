import React, {
  useState,
  useRef,
  MouseEvent,
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

const ShareLink = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [roomDetails] = RoomDetailsUpdated();
  const inputRef = useRef(null);

  const generateLink = () => {
    const [roomID] = roomDetails;
    return roomID ? `${process.env.REACT_APP_CLIENT_URL}?roomId=${roomID.value}` : ''
  }

  const handleClickCopy = (e: MouseEvent) => {
    if (inputRef != null && inputRef.current != null) {
      (inputRef.current as any).querySelector('input').select();
      document.execCommand("copy");
      setSnackbarOpen(true);
    }
  }

  const handleClose = () => {
    setSnackbarOpen(false);
  }

  return (
    <Paper
      elevation={0}
    >
      <Typography
        variant="h5"
        component="p"
      >
        Chatting is better with friends! Share the invite link below to encourage others to join your room.
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="Share Link"
        id="share-link"
        value={ generateLink() }
        ref={ inputRef }
        InputProps={{
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
          )
        }}
      />
      <Snackbar
        open={snackbarOpen}
        // autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          variant="success"
          message="Copied to clipboard"
          closeHandler={ handleClose }
        />
      </Snackbar>
    </Paper>
  )
}
export default ShareLink;
