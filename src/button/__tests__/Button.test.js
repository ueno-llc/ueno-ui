import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

it('Button works', () => {
  const wrapper = shallow(<Button />);
  expect(wrapper).not.toBe(undefined);
});
