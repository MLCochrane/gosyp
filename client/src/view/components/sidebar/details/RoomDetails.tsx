import React, {
  useState,
  useEffect,
} from 'react';
import {
  Paper,
  Divider,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DetailRow from './DetailRow';
import { RoomDetailsUpdated } from '../../lib/events/rooms';
import ShareLink from './ShareLink';
import LeaveRoom from '../LeaveRoom';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: '100%',
  },
  roomDetails: {
    padding: theme.spacing(2),
  },
  divideWrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const RoomDetails = (): JSX.Element => {
  const classes = useStyles();
  const [details] = RoomDetailsUpdated();
  const [rows, setRows] = useState<RoomDetails>([]);

  useEffect(() => {
    /**
     * Because we're simply updating all detail rows
     * we're assuming that the server will be handling
     * when this should be updated and with what.
     */
    if (details && details.length) {
      setRows(details);
    }
  }, [details]);

  const detailList = () => (
    <ul>
      {
      rows.map((row) => {
        let dateVal = null;
        if (row.name === 'Created at') {
          const timeToShow = new Date(row.value);
          dateVal = timeToShow.toLocaleString();
        }

        return (
          <li
            key={ row.value }
          >
            <DetailRow
              name={ row.name }
              value={ (dateVal || row.value) }
            />
          </li>
        );
      })
    }
    </ul>
  );

  return (
    <Grid
      container
      alignContent="space-between"
      className={ classes.gridContainer }
      data-testid="room-details"
    >
      <Grid item>
        <Paper
          elevation={ 0 }
          className={ classes.roomDetails }
        >
          { detailList() }
          <Paper
            elevation={ 0 }
            className={ classes.divideWrapper }
          >
            <Divider
              variant="middle"
            />
          </Paper>
          <ShareLink />
        </Paper>
      </Grid>
      <Grid item>
        <LeaveRoom />
      </Grid>
    </Grid>
  );
};
export default RoomDetails;
