import React, {
  useState,
  useEffect,
} from 'react';
import DetailRow from './DetailRow';
import { RoomDetailsUpdated } from '../../lib/events/rooms';

const RoomDetails = () => {
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
    if (details.length) {
      setRows(details);
    }
  }, [details]);

  return (
    <div className="room-details">
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
    </div>
  );
};
export default RoomDetails;
