import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusMessage from './StatusMessage';

it('renders props', () => {
  const { rerender } = render(<StatusMessage
    id="random"
    messageType="status"
    msg="John Snow entered the chat"
    timestamp={ new Date('March 20, 2020') }
  />);

  expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('John Snow entered the chat');
  expect(screen.getByText('12:00:00 AM')).toBeDefined();

  rerender(<StatusMessage
    id="random"
    messageType="status"
    msg="Bob left"
    timestamp={ new Date('October 18, 2021, 03:24:00') }
  />);

  expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Bob left');
  expect(screen.getByText('3:24:00 AM')).toBeDefined();
});
