import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwitchView from '../lib/helpers/SwitchView';
import CreateForm from './create/CreateForm';
import JoinFrom from './join/JoinForm';

const useStyles = makeStyles(() => ({
  home: {
    position: 'relative',
    height: '100%',
  },
  formWrapper: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [formToggle, setFormToggle] = useState(true);
  const handleClick = () => {
    setFormToggle((old) => !old);
  };
  return (
    <div className={ classes.home }>
      <Container
        maxWidth="sm"
        className={ classes.formWrapper }
      >
        <Typography
          variant="h1"
          component="p"
          color="primary"
        >
          GOSYP
        </Typography>
        <SwitchView trigger={ formToggle } current={ JoinFrom } next={ CreateForm } />
        <Button
          fullWidth
          color="primary"
          onClick={ handleClick }
        >
          {
            formToggle
              ? 'Have a room id? Join your room now!'
              : 'No room set up? Create a new room!'
          }
        </Button>
      </Container>
    </div>
  );
};
export default Home;
