import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('Error Boundry', () => {
  const Throw = () => {
    throw new Error('bad');
  };

  let spy: jest.SpyInstance;
  beforeEach(() => {
    /**
     * Provides unnecessary noise if we don't silence the console.
     */
    spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => ({ log() { return null; } }));
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('displays children if no error thrown', () => {
    render(
      <ErrorBoundary>
        <h1>No Error</h1>
      </ErrorBoundary>,
    );
    expect(screen.getByRole('heading').textContent).toBe('No Error');
  });

  it('displays error if error thrown', () => {
    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('heading').textContent).toBe('Something went wrong.');
  });

  it('displays optional prop instead of message if error thrown', () => {
    render(
      <ErrorBoundary
        errorDisplay={ <h1 className="error">I show message</h1> }
      >
        <Throw />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('heading').textContent).toBe('I show message');
  });
});
