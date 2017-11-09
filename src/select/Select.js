import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import s from './Select.scss';

export default class Select extends Component {

  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    type: PropTypes.string,
    autofocus: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    hasError: PropTypes.bool,
    className: PropTypes.string,
    isSuccess: PropTypes.bool,
  };

  componentDidMount() {
    if (this.props.autofocus) {
      this.select.focus();
    }
  }

  render() {
    const {
      children,
      id,
      type,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      autofocus,
      hasError,
      className,
      isSuccess,
      ...other
    } = this.props;

    const classNames = classnames(s.select, className, {
      [s.error]: hasError,
      [s.success]: isSuccess,
    });

    return (
      <select
        ref={(ref) => { this.select = ref; }}
        id={id}
        className={classNames}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...other}
      >
        {children}
      </select>
    );
  }
}
