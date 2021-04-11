import React from 'react';
import { mount } from 'enzyme';
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
    const wrapper = mount(
      <ErrorBoundary>
        <div>
          No error
        </div>
      </ErrorBoundary>,
    );
    expect(wrapper.contains('No error')).toEqual(true);
  });

  it('displays error if error thrown', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>,
    );
    expect(wrapper.contains('Something went wrong.')).toEqual(true);
  });

  it('displays optional prop instead of message if error thrown', () => {
    const wrapper = mount(
      <ErrorBoundary
        errorDisplay={ <div className="error">I show message</div> }
      >
        <Throw />
      </ErrorBoundary>,
    );
    expect(wrapper.contains('I show message')).toEqual(true);
  });
});
