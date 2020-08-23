import React from 'react';
import { mount } from 'enzyme';
import ErrorBoundry from './ErrorBoundry';

describe('Error Boundry', () => {
  const Throw = () => {
    throw new Error('bad');
  };

  let spy: any;
  beforeEach(() => {
    /**
     * Provides unnecessary noise if we don't silence the console.
     */
    spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('displays children if no error thrown', () => {
    const wrapper = mount(
      <ErrorBoundry>
        <div>
          No error
        </div>
      </ErrorBoundry>,
    );
    expect(wrapper.contains('No error')).toEqual(true);
  });

  it('displays error if error thrown', () => {
    const wrapper = mount(
      <ErrorBoundry>
        <Throw />
      </ErrorBoundry>,
    );
    expect(wrapper.contains('Something went wrong.')).toEqual(true);
  });

  it('displays optional prop instead of message if error thrown', () => {
    const wrapper = mount(
      <ErrorBoundry
        errorDisplay={ <div className="error">I show message</div> }
      >
        <Throw />
      </ErrorBoundry>,
    );
    expect(wrapper.contains('I show message')).toEqual(true);
  });
});
