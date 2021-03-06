import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  body: {
    color: theme.palette.text.secondary,
  },
}));

const InfoBlock = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className="info-block" data-testid="info-block">
      <Paper
        className={ classes.paper }
        elevation={ 0 }
      >
        <Typography
          className={ classes.header }
          component="h2"
          variant="h5"
        >
          Room Details
        </Typography>
        <Typography
          component="p"
          variant="h6"
        >
          Not much happening...
        </Typography>
        <Typography
          className={ classes.body }
        >
          Once you&apos;re in a room you can see details about it here. Now go get chatting!
        </Typography>
      </Paper>
    </div>
  );
};
export default InfoBlock;
