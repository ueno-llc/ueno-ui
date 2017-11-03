import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import s from './Checkbox.scss';

export default class Checkbox extends Component {

  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  render() {
    const {
      label,
      name,
      className,
      onChange,
      onFocus,
      onBlur,
      ...other
    } = this.props;

    const id = `field_${name}`;

    return (
      <div className={classnames(s.checkbox, className)}>
        <label className={s.checkbox__label} htmlFor={id}>
          <input
            className={s.checkbox__input}
            type="checkbox"
            name={name}
            id={id}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            {...other}
          />

          <span className={s.checkbox__vue} />
          {label}
        </label>
      </div>
    );
  }
}
