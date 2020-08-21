import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';
import Header from './header/Header';

it('renders childrens', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.find(Header)).toHaveLength(1);
});
