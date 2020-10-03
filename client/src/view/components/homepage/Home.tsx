import React from 'react';
import CreateForm from './create/CreateForm';
import JoinFrom from './join/JoinForm';

const Home = () => (
  <div className="home">
    <JoinFrom />
    <CreateForm />
  </div>
);
export default Home;
