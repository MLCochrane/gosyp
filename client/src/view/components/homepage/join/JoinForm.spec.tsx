import React from 'react';
import { shallow } from 'enzyme';
import JoinForm from './JoinForm';
import Form from '../../chat/form/Form';

it('renders form', () => {
  const wrapper = shallow(<JoinForm />);
  expect(wrapper.find(Form)).toHaveLength(1);
});
