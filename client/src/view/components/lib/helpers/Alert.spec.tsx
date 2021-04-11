import React from 'react';
import { shallow } from 'enzyme';
import {
  Close,
} from '@material-ui/icons';
import {
  IconButton,
  Paper,
} from '@material-ui/core';
import Alert from './Alert';

it('displays message', () => {
  const func = jest.fn();
  expect(shallow(<Alert variant="success" message="Hi there" closeHandler={ func } />).contains('Hi there')).toEqual(true);
  expect(shallow(<Alert variant="success" message="Great job!" closeHandler={ func } />).contains('Great job!')).toEqual(true);
});

it('displays clickable icon', () => {
  const closeMock = jest.fn();
  const wrapper = shallow(
    <Alert
      variant="success"
      message="Howdy hey!"
      closeHandler={ closeMock }
    />,
  );

  expect(wrapper.contains('Howdy hey!')).toEqual(true);
  expect(wrapper.find(IconButton)).toHaveLength(1);
  expect(wrapper.find(Close)).toHaveLength(1);

  wrapper.find(IconButton).simulate('click');
  expect(closeMock).toHaveBeenCalledTimes(1);
});

it('sets class based on variant', () => {
  const closeMock = jest.fn();
  const wrapper = shallow(<Alert
    variant="error"
    message="Howdy hey!"
    closeHandler={ closeMock }
  />);

  expect(wrapper.find(Paper).props().className).toContain('error');
  expect(wrapper.find(Paper).props().className).not.toContain('success');

  const wrapperTwo = shallow(<Alert
    variant="success"
    message="Howdy hey!"
    closeHandler={ closeMock }
  />);

  expect(wrapperTwo.find(Paper).props().className).toContain('success');
  expect(wrapperTwo.find(Paper).props().className).not.toContain('error');
});
