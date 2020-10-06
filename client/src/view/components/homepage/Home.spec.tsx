import React from 'react';
import { shallow } from 'enzyme';
import {
  Container,
  Button,
} from '@material-ui/core';
import Home from './Home';

it('renders children', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find(Container)).toHaveLength(1);
  expect(wrapper.find(Button)).toHaveLength(1);
});
