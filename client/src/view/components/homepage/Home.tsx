import React, { useState } from 'react';
import {
  Container,
  Button,
} from '@material-ui/core';
import SwitchView from '../lib/helpers/SwitchView';
import CreateForm from './create/CreateForm';
import JoinFrom from './join/JoinForm';

const Home = () => {
  const [formToggle, setFormToggle] = useState(true);
  const handleClick = () => {
    setFormToggle((old) => !old);
  };
  return (
    <div className="home">
      <Container maxWidth="sm">
        <SwitchView trigger={ formToggle } current={ JoinFrom } next={ CreateForm } />
        <Button
          fullWidth
          color="primary"
          onClick={ handleClick }
        >
          {
            formToggle ? 'Join Room' : 'Create room'
          }
        </Button>
      </Container>
    </div>
  );
};
export default Home;
