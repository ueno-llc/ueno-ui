import React, { Component, PropTypes } from 'react';
import { TimelineLite, TweenLite } from 'gsap';
import classnames from 'classnames';

import Input from '../input/Input';
import Textarea from '../textarea/Textarea';

import s from './Field.scss';

export default class Field extends Component {
  static propTypes = {
    children: PropTypes.node,
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    showLabel: false,
  };

  componentDidMount() {
    TweenLite.set(this.labelEl, { y: 10, opacity: 0 });
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
    t.to(this.labelEl, 0.5, { y: 0, ease: window.Power4.easeOut });
    t.to(this.labelEl, 0.5, { opacity: 1 }, '-=0.5');
  }

  hideLabel() {
    const t = new TimelineLite();
    t.to(this.labelEl, 0.2, { y: 10, ease: window.Power4.easeOut });
    t.to(this.labelEl, 0.2, { opacity: 0 }, '-=0.2');
  }

  render() {
    const { children, label, name, error, className } = this.props;
    const id = `field_${name}`;
    const inputType = <Input />.type;
    const selectType = <select />.type;
    const textareaType = <Textarea />.type;

    const errorBlock = error &&
      <div className={s.field__error}>
        <p className={s.field__message}>{error}</p>
      </div>;

    const childs = React.Children.toArray(children);

    const fields = childs.filter(
      c =>
        c.type === inputType ||
        c.type === selectType ||
        c.type === textareaType,
    );

    const rest = childs.filter(
      c =>
        c.type !== inputType &&
        c.type !== selectType &&
        c.type !== textareaType,
    );

    return (
      <div className={classnames(s.field, className)}>
        {errorBlock}
        <label
          htmlFor={id}
          className={s.field__label}
          ref={ref => this.labelEl = ref}
        >
          {label}
        </label>
        {fields.map((c) => {
          const opts = {
            placeholder: label,
            name,
            id,
            ref: ref => this.inputEl = ref,
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
