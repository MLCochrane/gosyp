import React from 'react';
import { render, screen } from '@testing-library/react';
import TitleBar from './TitleBar';

it('displays title based on room details', () => {
  render(<TitleBar />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('gosyp.io');
});
