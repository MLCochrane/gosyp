import {
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';

const DetailRow = ({
  name,
  value,
}: {
  name: string,
  value: string,
}) => (
  <Grid
    className="detail-row"
    container
    justify="space-between"
  >
    <Grid item>
      <Typography className="detail-row__name">{ name }</Typography>
    </Grid>
    <Grid item>
      <Typography className="detail-row__value">{ value }</Typography>
    </Grid>
  </Grid>
);
export default DetailRow;
