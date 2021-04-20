import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';

it('renders without crashing', () => {
  render(<Sidebar />);
});
