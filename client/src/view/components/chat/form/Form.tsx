import React, { ChangeEvent, useState } from 'react';
import {
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { socket } from 'api';
import Events from 'view/components/lib/events/eventTypes';

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

const Form = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = e;
    setMessage(target.value);
    socket.emit(Events.userTyping, true);
  };

  const handleBlur = () => {
    socket.emit(Events.userTyping, false);
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message === '') return;
    socket.emit(Events.chatMessage, message);
    socket.emit(Events.userTyping, false);
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
