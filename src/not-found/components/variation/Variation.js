import React, { Component, PropTypes } from 'react';

import UenoButton from '../../../ueno-button/UenoButton';

import s from './Variation.scss';

export default class Variation extends Component {

  static propTypes = {
    subheading: PropTypes.string,
    text: PropTypes.string,
    button: PropTypes.string,
  };

  render() {
    const { subheading, text, button } = this.props;

    return (
      <div>
        <h2 className={s.variation__subheading}>{subheading}</h2>
        <p className={s.variation__copy}>{text}</p>

        <UenoButton to="/">
          {button}
        </UenoButton>
      </div>
    );
  }
}
