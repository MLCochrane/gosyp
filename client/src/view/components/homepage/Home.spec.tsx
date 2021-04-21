import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

it('renders components', () => {
  render(<Home />);
  expect(screen.getByText('GOSYP')).toBeDefined();
  expect(screen.getByRole('heading', { level: 5 }).textContent).toBe('Join Room');
  expect(screen.getByRole('button', { name: 'No room set up? Create a new room!' })).toBeDefined();
});

it('switches between the two forms and changes surrounding elements', () => {
  render(<Home />);
  const toggle = screen.getByTestId('toggle-button');
  const title = screen.getByRole('heading', { level: 5 });
  expect(toggle.textContent).toBe('No room set up? Create a new room!');
  expect(title.textContent).toBe('Join Room');
  userEvent.click(toggle);
  expect(toggle.textContent).toBe('Have a room id? Join your room now!');
  expect(title.textContent).toBe('Create Room');
});
