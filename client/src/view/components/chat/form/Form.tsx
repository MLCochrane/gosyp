import React, { ChangeEvent, useState } from 'react';
import {
  useSelector,
} from 'react-redux';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { socket } from 'api';
import { EventNames as Events } from 'typings';
import { AppState } from 'store/reducers';

const useStyles = makeStyles((theme) => (
  {
    form: {
      display: 'flex',
    },
    field: {
      marginRight: theme.spacing(2),
    },
    button: {
      width: '10%',
    },
  }
));

const Form = (): JSX.Element => {
  const classes = useStyles();
  const { currentRoom: roomID } = useSelector((state: AppState) => state.rooms);
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = e;
    setMessage(target.value);
    socket.emit(Events.userTyping, roomID, true);
  };

  const handleBlur = () => {
    socket.emit(Events.userTyping, roomID, false);
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message === '') return;
    socket.emit(Events.chatMessage, roomID, message);
    socket.emit(Events.userTyping, roomID, false);
    setMessage('');
  };

  return (
    <div className="form-wrapper chat__component">
      <form
        className={ classes.form }
        onSubmit={ formSubmit }
        action=""
      >
        <TextField
          className={ classes.field }
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ message }
          placeholder="Enter message..."
          variant="outlined"
          fullWidth
        />
        <Button
          className={ classes.button }
          color="primary"
          type="submit"
          variant="contained"
          disabled={ !message.length }
        >
          Send
        </Button>
      </form>
    </div>
  );
};
export default Form;
