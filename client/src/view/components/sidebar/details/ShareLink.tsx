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
} from '@material-ui/core';
import { RoomDetailsUpdated } from 'view/components/lib/events/rooms';

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
              <IconButton
                aria-label="copy room link to clipboard"
                onClick={ handleClickCopy }
                >
                copy
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Snackbar
        open={snackbarOpen}
        // autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message="Copied to clipboard"
      />
    </Paper>
  )
}
export default ShareLink;
