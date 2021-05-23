import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailRow from './DetailRow';

it('displays name and value from props', () => {
  const { rerender } = render(<DetailRow
    name="Id"
    value="#103-104"
  />);

  expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Id:');
  expect(screen.getByText('#103-104')).toBeDefined();

  rerender(<DetailRow
    name="Created at"
    value="08/13/20"
  />);

  expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Created at:');
  expect(screen.getByText('08/13/20')).toBeDefined();
});
