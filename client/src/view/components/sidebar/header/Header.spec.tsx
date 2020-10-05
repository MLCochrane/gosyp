import React from 'react';
import { Typography } from '@material-ui/core';
import { shallow } from 'enzyme';
import Header from './Header';

it('displays title', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find(Typography)).toHaveLength(1);
});
