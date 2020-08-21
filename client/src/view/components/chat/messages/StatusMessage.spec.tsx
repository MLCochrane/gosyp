import React from 'react';
import { shallow } from 'enzyme';
import StatusMessage from './StatusMessage';

it('renders props', () => {
  const wrapper = shallow(<StatusMessage
    id="random"
    messageType="status"
    msg="John Snow entered the chat"
    timestamp={ new Date('March 20, 2020') }
  />);

  expect(wrapper.contains('John Snow entered the chat')).toEqual(true);
  expect(wrapper.contains('12:00:00 AM')).toEqual(true);
});
