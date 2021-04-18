import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ResizeHandler, MobileCheck } from './windowEvents';

it('returns a bool based on the resizing handler', async () => {
  const Dummy = () => {
    const [isResizing] = ResizeHandler();
    return (
      <div>
        {
          isResizing ? 'resizing' : 'done'
        }
      </div>
    );
  };

  render(<Dummy />);
  act(() => {
    global.dispatchEvent(new Event('resize'));
  });
  expect(await screen.findByText('resizing')).toBeTruthy();
  expect(await screen.findByText('done')).toBeTruthy();
});

it('returns a bool based on the window check', async () => {
  const Dummy = () => {
    const [isMobile] = MobileCheck();
    return (
      <div>
        {
          isMobile ? <h1>Mobile</h1> : <h1>Not Mobile</h1>
        }
      </div>
    );
  };

  Object.defineProperty(window, 'screen', { writable: true, configurable: true, value: { width: 1400 } });
  const { unmount } = render(<Dummy />);
  expect(screen.getByRole('heading').textContent).toBe('Not Mobile');

  unmount();

  Object.defineProperty(window, 'screen', { writable: true, configurable: true, value: { width: 400 } });
  render(<Dummy />);
  expect(screen.getByRole('heading').textContent).toBe('Mobile');
});
