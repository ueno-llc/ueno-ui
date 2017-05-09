import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import s from './Checkbox.scss';

export default class Checkbox extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
  };

  render() {
    const { label, name, className } = this.props;
    const id = `field_${name}`;

    return (
      <div className={classnames(s.checkbox, className)}>
        <label className={s.checkbox__label} htmlFor={id}>
          <input
            className={s.checkbox__input}
            type="checkbox"
            name={name}
            id={id}
          />
          <span className={s.checkbox__vue} />
          {label}
        </label>
      </div>
    );
  }
}
