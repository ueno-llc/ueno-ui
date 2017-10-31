import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineLite from 'gsap/TimelineLite';
import classnames from 'classnames';

import Input from '../input/Input';
import Textarea from '../textarea/Textarea';

import s from './Field.scss';

export default class Field extends Component {

  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    success: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    className: PropTypes.string,
  };

  state = {
    showLabel: false,
  };

  componentDidMount() {
    const t = new TimelineLite();
    t.set(this.labelEl, { y: 10, opacity: 0 });
  }

  onChange = onChangeOld => e => onChangeOld(e);

  onFocus = () => {
    this.showLabel();
  };

  onBlur = (e) => {
    const { currentTarget: { value } } = e;

    if (value === '') {
      this.hideLabel();
    }
  };

  showLabel() {
    const t = new TimelineLite();
    t.to(this.labelEl, 0.5, { y: 0, ease: 'Power4.easeOut' });
    t.to(this.labelEl, 0.5, { opacity: 1 }, '-=0.5');
  }

  hideLabel() {
    const t = new TimelineLite();
    t.to(this.labelEl, 0.2, { y: 10, ease: 'Power4.easeOut' });
    t.to(this.labelEl, 0.2, { opacity: 0 }, '-=0.2');
  }

  render() {
    const { children, label, name, error, success, className } = this.props;
    const id = `field_${name}`;
    const inputType = <Input />.type;
    const selectType = <select />.type;
    const textareaType = <Textarea />.type;
    const childs = React.Children.toArray(children);

    const errorBlock = error && (
      <div className={s.field__message}>
        <p className={classnames(s.field__text, s.field__error)}>{error}</p>
      </div>
    );

    const successBlock = success && (
      <div className={s.field__message}>
        <p className={classnames(s.field__text, s.field__success)}>{success}</p>
      </div>
    );

    const fields = childs.filter(c =>
      c.type === inputType ||
      c.type === selectType ||
      c.type === textareaType,
    );

    const rest = childs.filter(c =>
      c.type !== inputType &&
      c.type !== selectType &&
      c.type !== textareaType,
    );

    return (
      <div className={classnames(s.field, className)}>
        {errorBlock}
        {successBlock}

        <label
          htmlFor={id}
          className={s.field__label}
          ref={(ref) => { this.labelEl = ref; }}
        >
          {label}
        </label>

        {fields.map((c) => {
          const opts = {
            placeholder: label,
            name,
            id,
            ref: (ref) => { this.inputEl = ref; },
          };

          if (c.type === inputType) {
            opts.onFocus = this.onFocus;
            opts.onBlur = this.onBlur;
          }

          if (c.type === textareaType) {
            opts.onFocus = this.onFocus;
            opts.onBlur = this.onBlur;
          }

          if (c.type === selectType) {
            opts.className = s.field__select;
            opts.onChange = this.onChange(c.props.onChange);
            opts.onFocus = this.onFocus;
            opts.onBlur = this.onBlur;
          }

          return React.cloneElement(c, opts);
        })}

        {rest}
      </div>
    );
  }
}
