import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Button, Item } from '../src';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Item', module).add('with image', () => (
  <Item name="Test" link="" tags={['Ueno is Cool']}>
    <img src={require('../assets/famous-website-portrait.jpg')} alt="" />
  </Item>
));
