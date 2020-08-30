import React from 'react';
import { shallow, mount } from 'enzyme';
import TextField from './TextField';

it('sets props for label and input', () => {
  const wrapperOne = shallow(<TextField
    id="test-name"
    value="val"
    label="First Name"
    inputName="name"
    placeholder="First Name"
    handleChange={ jest.fn() }
    errors={ false }
    errorMessage=""
    required={ false }
  />);

  const input = wrapperOne.find('input');
  expect(input.props().name).toEqual('name');
  expect(input.props().id).toEqual('test-name');
  expect(input.props().value).toEqual('val');
  expect(input.props().placeholder).toEqual('First Name');
  expect(input.props().required).toEqual(false);

  const label = wrapperOne.find('label');
  expect(label.contains('First Name'));
  expect(label.props().htmlFor).toEqual('test-name');

  expect(wrapperOne.find('.form-field__helper')).toHaveLength(0);
  expect(wrapperOne.find('.form-field__input-wrap.has-error')).toHaveLength(0);

  const wrapperTwo = shallow(<TextField
    id="test-email"
    value="jack@sparrow.com"
    label="Email"
    inputName="email"
    placeholder="Enter email..."
    handleChange={ jest.fn() }
    errors
    errorMessage="Email is taken"
    required
  />);

  const inputTwo = wrapperTwo.find('input');
  expect(inputTwo.props().name).toEqual('email');
  expect(inputTwo.props().id).toEqual('test-email');
  expect(inputTwo.props().value).toEqual('jack@sparrow.com');
  expect(inputTwo.props().placeholder).toEqual('Enter email...');
  expect(inputTwo.props().required).toEqual(true);

  const labelTwo = wrapperTwo.find('label');
  expect(labelTwo.contains('Email'));
  expect(labelTwo.props().htmlFor).toEqual('test-email');

  expect(wrapperTwo.find('.form-field__helper')).toHaveLength(1);
  expect(wrapperTwo.find('.form-field__input-wrap.has-error')).toHaveLength(1);
});

it('calls callback when onChanage is fired', () => {
  const callbackMock = jest.fn();
  const wrapper = mount(<TextField
    id="test-name"
    value="val"
    label="First Name"
    inputName="name"
    placeholder="First Name"
    handleChange={ callbackMock }
    errors={ false }
    errorMessage=""
    required={ false }
  />);

  wrapper.find('input').simulate('change', { target: { value: 'val' } });
  expect(callbackMock).toHaveBeenCalledTimes(1);
});
