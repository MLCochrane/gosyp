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

const useStyles = makeStyles((theme: any) => ({
  home: {
    position: 'relative',
    height: '100%',
    background: theme.palette.background.paper,
  },
  formWrapper: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  },
  title: {
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  welcomeText: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  buttonToggle: {
    display: 'block',
    margin: `${theme.spacing(2)}px auto 0`,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [formToggle, setFormToggle] = useState(false);
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
          variant="h2"
          component="p"
          className={ classes.title }
        >
          GOSYP
        </Typography>
        <Typography
          variant="h5"
          className={ classes.welcomeText }
        >
          {
            !formToggle
            ? "Join Room"
            : "Create Room"
          }
        </Typography>
        <SwitchView
          trigger={formToggle }
          current={ JoinFrom }
          next={ CreateForm }
          useAnimation
        />
        <Button
          color="primary"
          className={ classes.buttonToggle }
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
