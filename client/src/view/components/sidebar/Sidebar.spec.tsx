import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';
import Details from './details/DetailWidget';

it('renders childrens', () => {
  const wrapper = shallow(<Sidebar />);
  expect(wrapper.find(Details)).toHaveLength(2);
});
