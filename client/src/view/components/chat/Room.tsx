import React from 'react';
import ErrorBoundary from 'view/components/lib/helpers/ErrorBoundary';
import Chat from './Chat';

const Room = () => (
  <ErrorBoundary
    errorDisplay={ <p>Boom boom goes app</p> }
  >
    <Chat />
  </ErrorBoundary>
);
export default Room;
