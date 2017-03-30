import React from 'react';
import { shallow } from 'enzyme';
import Button from '../Button';

it('should work', () => {
  const wrapper = shallow(<Button />);
  expect(wrapper).not.toBe(undefined);
});

it('should add classes via styles prop', () => {
  const wrapper = shallow(<Button styles="extra" />);
  expect(wrapper.prop('className')).toBe('button extra');
});
