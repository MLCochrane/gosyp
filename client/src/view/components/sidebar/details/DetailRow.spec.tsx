import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailRow from './DetailRow';

it('displays name and value from props', () => {
  render(<DetailRow
    name="Id"
    value="#103-104"
  />);

  expect(screen.getByText('Id:')).toBeDefined();
  expect(screen.getByText('#103-104')).toBeDefined();

  render(<DetailRow
    name="Created at"
    value="08/13/20"
  />);

  expect(screen.getByText('Created at:')).toBeDefined();
  expect(screen.getByText('08/13/20')).toBeDefined();
});
