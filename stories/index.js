import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import {
  AboutDemo,
  PopupDemo,
  Item,
  Image,
  Field,
  Input,
  Select,
  Checkbox,
  Textarea,
  UenoButton,
  Button,
} from '../src';

storiesOf('About', module).add('default', () => <AboutDemo />);

storiesOf('Popup', module).add('default', () => <PopupDemo />);

storiesOf('Ueno Button', module)
  .add('with text', () => (
    <UenoButton onClick={action('clicked')}>Hello Button</UenoButton>
  ))
  .add('submit', () => (
    <UenoButton submit onClick={action('clicked')}>Submit</UenoButton>
  ))
  .add('with cross instead of arrow', () => (
    <UenoButton hasCross onClick={action('clicked')}>Full image</UenoButton>
  ));

storiesOf('Item', module)
  .add('with hover effect on image', () => (
    <div style={{ width: '500px' }}>
      <Item disableScrollEffect>
        <img src={require('../assets/famous-website-portrait.jpg')} alt="" />
      </Item>
    </div>
  ))
  .add('with hover effect when in view', () => (
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

storiesOf('Form', module)
  .add('input', () => (
    <Field label="Name" name="name">
      <Input type="text" />
    </Field>
  ))
  .add('input with error', () => (
    <Field label="Name" name="name" error="Name missing">
      <Input type="text" hasError />
    </Field>
  ))
  .add('textarea', () => (
    <Field label="Text" name="text">
      <Textarea />
    </Field>
  ))
  .add('textarea with error', () => (
    <Field label="Text" name="text" error="Text missing">
      <Textarea hasError error />
    </Field>
  ))
  .add('select', () => (
    <Field label="Text" name="text">
      <Select name="checkbox" label="checkbox">
        <option defaultValue disabled>Default and disabled option</option>
        <option>Other option 1</option>
        <option>Other option 2</option>
        <option>Other option 3</option>
        <option>Other option 4</option>
      </Select>
    </Field>
  ))
  .add('checkbox', () => <Checkbox name="checkbox" label="checkbox" />);

storiesOf('Default button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
