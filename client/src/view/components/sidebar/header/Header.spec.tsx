import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

it('displays title', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('h1')).toHaveLength(1);
});
