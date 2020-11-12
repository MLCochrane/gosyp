import React from 'react';
import { shallow } from 'enzyme';
import DetailRow from './DetailRow';

it('displays name and value from props', () => {
  const wrapper = shallow(<DetailRow
    name="Id"
    value="#103-104"
  />);

  expect(wrapper.contains('Id')).toEqual(true);
  expect(wrapper.contains('#103-104')).toEqual(true);

  const wrapperTwo = shallow(<DetailRow
    name="Created at"
    value="08/13/20"
  />);

  expect(wrapperTwo.contains('Created at:')).toEqual(true);
  expect(wrapperTwo.contains('08/13/20')).toEqual(true);
});
