import React, { Component, PropTypes } from 'react';
import s from './Button.scss';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    styles: PropTypes.string,
  };

  render() {
    const { children, styles } = this.props;
    return (
      <button className={[s.button, styles].join(' ')}>
        {children}
      </button>
    );
  }
}
