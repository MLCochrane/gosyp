import React from 'react';
import ErrorBoundry from 'view/components/lib/helpers/ErrorBoundry';
import Chat from './Chat';

const Room = () => (
  <ErrorBoundry
    errorDisplay={ <p>Boom boom goes app</p> }
  >
    <Chat />
  </ErrorBoundry>
);
export default Room;
