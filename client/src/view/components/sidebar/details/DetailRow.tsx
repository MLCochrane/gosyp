import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => (
  {
    detailName: {
      fontSize: '1em',
    },
    detailValue: {
      fontSize: '1em',
      color: theme.palette.secondary.main,
    },
  }
));

const DetailRow = ({
  name,
  value,
}: {
  name: string,
  value: string,
}): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid
      className="detail-row"
      container
      justifyContent="space-between"
    >
      <Grid item>
        <Typography
          variant="h5"
          component="h3"
          className={ classes.detailName }
        >
          { `${name}:` }
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="h5"
          component="p"
          className={ classes.detailValue }
        >
          { value }
        </Typography>
      </Grid>
    </Grid>
  );
};
export default DetailRow;
