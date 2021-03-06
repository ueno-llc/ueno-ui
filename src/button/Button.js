import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Button.scss';

export default class Button extends Component {

  static propTypes = {
    children: PropTypes.node,
    styles: PropTypes.string,
    onClick: PropTypes.func,
  };

  render() {
    const { children, onClick, styles } = this.props;

    return (
      <button className={[s.button, styles].join(' ')} onClick={onClick}>
        {children}
      </button>
    );
  }
}
