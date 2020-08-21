import React from 'react';
import { shallow } from 'enzyme';
import UserMessage from './UserMessage';

const props = {
  id: 'random',
  msg: 'Howdy',
  timestamp: new Date('March 20, 2020'),
  user: {
    id: 'userid',
    nickname: null,
  },
};

it('renders props', () => {
  const wrapper = shallow(<UserMessage
    messageType="message"
    { ...props }
  />);

  expect(wrapper.contains('12:00:00 AM')).toEqual(true);
  expect(wrapper.contains('Howdy')).toEqual(true);
  expect(wrapper.contains('userid')).toEqual(true);
});

it('displays nickname if provided', () => {
  const wrapper = shallow(<UserMessage
    messageType="message"
    { ...props }
    user={ {
      id: 'userid',
      nickname: 'Joe',
    } }
  />);

  expect(wrapper.contains('12:00:00 AM')).toEqual(true);
  expect(wrapper.contains('Howdy')).toEqual(true);
  expect(wrapper.contains('userid')).toEqual(false);
  expect(wrapper.contains('Joe')).toEqual(true);
});
