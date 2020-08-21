import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import JoinForm from './join/JoinForm';

it('renders children', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find(JoinForm)).toHaveLength(1);
});
