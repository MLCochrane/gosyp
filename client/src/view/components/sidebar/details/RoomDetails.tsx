import React, {
  useState,
  useEffect,
} from 'react';
import {
  Paper,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DetailRow from './DetailRow';
import { RoomDetailsUpdated } from '../../lib/events/rooms';
import ShareLink from './ShareLink';

const useStyles = makeStyles((theme) => ({
  roomDetails: {
    padding: theme.spacing(2),
  },
  divideWrapper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

const RoomDetails = () => {
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
      rows.map((row) => (
        <li
          key={ row.value }
        >
          <DetailRow
            name={ row.name }
            value={ row.value }
          />
        </li>
      ))
    }
    </ul>
  );

  return (
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
  );
};
export default RoomDetails;
