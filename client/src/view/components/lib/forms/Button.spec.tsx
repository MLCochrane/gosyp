import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

it('renders with children', () => {
  const wrapper = shallow(
    <Button
      type="button"
      className="button-one"
      disabled={ false }
    >
      Click me!
    </Button>,
  );

  expect(wrapper.contains('Click me!')).toEqual(true);
  expect(wrapper.props().disabled).toEqual(false);
  expect(wrapper.props().className).toEqual('button button-one');
});

it('disables button with disabled prop', () => {
  const wrapper = shallow(
    <Button
      type="button"
      className="button-one"
      disabled
    >
      Click me!
    </Button>,
  );

  expect(wrapper.contains('Click me!')).toEqual(true);
  expect(wrapper.props().disabled).toEqual(true);
});

it('calls the handleClick callback on click', () => {
  const clickAway = jest.fn();
  const wrapper = shallow(
    <Button
      type="button"
      className="button-one"
      disabled={ false }
      handleClick={ clickAway }
    >
      Click me!
    </Button>,
  );

  wrapper.simulate('click');
  expect(clickAway).toHaveBeenCalledTimes(1);
});
