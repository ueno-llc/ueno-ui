import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Button, Item, Image } from '../src';

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Item', module).add('with image', () => (
  <div>
    <div style={{ marginBottom: '1000px' }}>
      Scroll Down
    </div>
    <div style={{ width: '600px' }}>
      <Item name="Test" link="" tags={['Ueno is Cool']}>
        <img src={require('../assets/famous-website-portrait.jpg')} alt="" />
      </Item>
    </div>
  </div>
));

storiesOf('Image', module)
  .add('with src', () => (
    <Image src={require('../assets/famous-website-portrait.jpg')} />
  ))
  .add('with pink placeholder', () => (
    <Image width="200" height="200" background="pink" src="/not-found" />
  ))
  .add('with srcSet', () => (
    <Image
      src={{
        src: require('../assets/famous-website-portrait.jpg'),
        src2x: require('../assets/famous-website-portrait@2x.jpg'),
      }}
    />
  ))
  .add('lazy', () => (
    <div>
      <div style={{ marginBottom: '1000px' }}>
        Scroll Down
      </div>
      <Image src={require('../assets/famous-website-portrait.jpg')} lazy />
    </div>
  ))
  .add('lazy with placeholder', () => (
    <div>
      <div style={{ marginBottom: '1000px' }}>
        Scroll Down
      </div>
      <Image
        src={require('../assets/famous-website-portrait.jpg')}
        lazy
        width="631"
        height="512"
      />
    </div>
  ));
