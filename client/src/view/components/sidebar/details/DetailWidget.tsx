import React from 'react';
import { HasAddedToRoom } from 'view/components/lib/events/rooms';
import SwitchView from 'view/components/lib/helpers/SwitchView';
import InfoBlock from './InfoBlock';
import RoomDetails from './RoomDetails';
import ErrorBoundry from 'view/components/lib/helpers/ErrorBoundary';

const DetailsWidget = () => {
  const [addedToRoom] = HasAddedToRoom();

  return (
    <ErrorBoundry>
      <SwitchView
        trigger={ addedToRoom }
        current={ InfoBlock }
        next={ RoomDetails }
        useAnimation={ false }
        />
    </ErrorBoundry>
  );
};
export default DetailsWidget;
