import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from './Alert';

it('displays message', () => {
  const func = jest.fn();
  render(<Alert variant="success" message="Hi there" closeAriaLabel="close" closeHandler={ func } />);
  expect(screen.getByText('Hi there')).toBeDefined();

  render(<Alert variant="success" message="Great Job" closeAriaLabel="close" closeHandler={ func } />);
  expect(screen.getByText('Great Job')).toBeDefined();
});

it('displays clickable icon', () => {
  const closeMock = jest.fn();
  render(
    <Alert
      variant="error"
      message="Howdy hey!"
      closeAriaLabel="close me"
      closeHandler={ closeMock }
    />,
  );

  userEvent.click(screen.getByRole('button', { name: 'close me' }));
  expect(closeMock).toHaveBeenCalledTimes(1);
});
