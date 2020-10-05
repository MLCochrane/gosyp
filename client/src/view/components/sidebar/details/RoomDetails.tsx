import React, {
  useState,
  useEffect,
} from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DetailRow from './DetailRow';
import { RoomDetailsUpdated } from '../../lib/events/rooms';

const useStyles = makeStyles((theme) => ({
  roomDetails: {
    padding: theme.spacing(2),
  },
}));

const RoomDetails = () => {
  const classes = useStyles();
  const [details] = RoomDetailsUpdated();
  const [rows, setRows] = useState<RoomDetails>([
    {
      name: 'N/A',
      value: 'N/A',
    },
  ]);

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

  return (
    <Paper
      elevation={ 0 }
      className={ classes.roomDetails }
    >
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
    </Paper>
  );
};
export default RoomDetails;
