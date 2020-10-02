import React from 'react';
import { HasAddedToRoom } from 'view/components/lib/events/rooms';
import SwitchView from 'view/components/lib/helpers/SwitchView';
import InfoBlock from './InfoBlock';
import RoomDetails from './RoomDetails';

const DetailsWidget = () => {
  const [addedToRoom] = HasAddedToRoom();

  return (
    <div className="details-widget">
      <SwitchView trigger={ addedToRoom } current={ InfoBlock } next={ RoomDetails } />
    </div>
  );
};
export default DetailsWidget;
