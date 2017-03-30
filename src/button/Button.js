import React, { Component, PropTypes } from 'react';
import s from './Button.css';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    return (
      <button className={s.button}>
        {children}
      </button>
    );
  }
}
