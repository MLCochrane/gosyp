import React,
{
  useEffect,
  useState,
  createRef,
} from 'react';
import Feed from './components/Feed';

const App = () => {
  return (
    <div className="app">
      <Feed></Feed>
    </div>
  );
};

export default App;
