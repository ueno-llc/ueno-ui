import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import s from './Textarea.scss';

export default class Textarea extends Component {
  static propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    hasError: PropTypes.bool,
    className: PropTypes.string,
  };

  render() {
    const {
      id,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      hasError,
      className,
      ...other
    } = this.props;

    return (
      <textarea
        id={id}
        className={classnames(s.textarea, className, {
          [s.error]: hasError,
        })}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...other}
      />
    );
  }
}
