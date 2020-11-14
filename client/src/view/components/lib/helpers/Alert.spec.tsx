import React from 'react';
import { shallow } from 'enzyme';
import Alert from './Alert';

it('displays message', () => {
  expect(shallow(<Alert variant="success" message="Hi there" />).contains('Hi there')).toEqual(true);
  expect(shallow(<Alert variant="success" message="Great job!" />).contains('Great job!')).toEqual(true);
});