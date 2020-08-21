import React from 'react';
import Chat from './Chat';
import ErrorBoundry from '../lib/helpers/ErrorBoundry';

const Room = () => (
  <div className="room">
    <ErrorBoundry
      errorDisplay={ <p>Boom boom goes app</p> }
    >
      <Chat />
    </ErrorBoundry>
  </div>
);
export default Room;
