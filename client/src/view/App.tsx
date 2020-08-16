import React from 'react';
import Feed from './components/Feed';
import Form from './components/Form';
import TypingStatus from './components/TypingStatus';

const App = () => {
  return (
    <div className="app">
      <Feed />
      <TypingStatus />
      <Form />
    </div>
  );
};

export default App;
