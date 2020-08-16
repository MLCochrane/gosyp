import React from 'react';
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  return (
    <div className="app">
      <div className="page-content">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default App;
