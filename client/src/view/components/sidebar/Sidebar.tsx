import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Header from './header/Header';
import Details from './details/DetailWidget';

const useStyles = makeStyles({
  paper: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
});

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Paper
      elevation={ 0 }
      className={ classes.paper }
    >
      <Header />
      <Details />
    </Paper>
  );
};
export default Sidebar;
