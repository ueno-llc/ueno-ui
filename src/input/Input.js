import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import s from './Input.scss';

export default class Input extends Component {

  static propTypes = {
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
      this.input.focus();
    }
  }

  render() {
    const {
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

    const classNames = classnames(s.input, className, {
      [s.error]: hasError,
      [s.success]: isSuccess,
    });

    return (
      <input
        ref={(ref) => { this.input = ref; }}
        id={id}
        className={classNames}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...other}
      />
    );
  }
}
