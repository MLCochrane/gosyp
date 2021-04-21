import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoBlock from './InfoBlock';

it('renders our placeholder message', () => {
  render(<InfoBlock />);
  expect(screen.getByText('Not much happening...')).toBeDefined();
  expect(screen.getByText('Once you\'re in a room you can see details about it here. Now go get chatting!')).toBeDefined();
});
