import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import s from './Cross.scss';

export default class Cross extends Component {

  static propTypes = {
    onClose: PropTypes.func,
    className: PropTypes.string,
  };

  render() {
    const { onClose, className } = this.props;

    return (
      <button
        className={classnames(s.cross, className)}
        onClick={onClose}
      />
    );
  }
}
