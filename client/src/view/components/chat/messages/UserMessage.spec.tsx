import React from 'react';
import { render, screen } from '@testing-library/react';
import UserMessage from './UserMessage';

it('renders props', () => {
  render(<UserMessage
    messageType="message"
    id="random"
    msg="Howdy"
    timestamp={ new Date('March 20, 2020 23:12:00') }
    user={ {
      id: 'userid',
      nickname: null,
    } }
  />);

  expect(screen.getByText('11:12:00 PM')).toBeDefined();
  expect(screen.getByText('Howdy')).toBeDefined();
  expect(screen.getByText('userid')).toBeDefined();
});

it('displays nickname if provided', () => {
  render(<UserMessage
    messageType="message"
    id="random"
    msg="Oh hey there!"
    timestamp={ new Date('March 20, 2020') }
    user={ {
      id: 'userid',
      nickname: 'Joe',
    } }
  />);

  expect(screen.getByText('12:00:00 AM')).toBeDefined();
  expect(screen.getByText('Oh hey there!')).toBeDefined();
  expect(screen.getByText('Joe')).toBeDefined();
  expect(screen.queryByText('userid')).toBeFalsy();

  render(<UserMessage
    messageType="message"
    id="random"
    msg="How are things?"
    timestamp={ new Date('March 20, 2020') }
    user={ {
      id: 'userid',
      nickname: 'Joe',
    } }
    hideMeta
  />);
});
