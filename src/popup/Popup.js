import 'gsap/CSSPlugin';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineLite from 'gsap/TimelineLite';

import UenoButton from '../ueno-button/UenoButton';
import Field from '../field/Field';
import Input from '../input/Input';
import Cross from '../cross/Cross';

import s from './Popup.scss';

export default class Popup extends Component {

  static propTypes = {
    heading: PropTypes.string,
    subheading: PropTypes.string,
    placeholder: PropTypes.string,
    actionText: PropTypes.string,
    onClose: PropTypes.func,
    sendEmail: PropTypes.func,
    response: PropTypes.object,
    hasError: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
    reset: PropTypes.func,
  };

  state = {
    email: undefined,
  }

  onChange = (e) => {
    const email = e.target.value;

    this.setState({ email });
  }

  onSubmit = (e) => {
    const { sendEmail } = this.props;
    const { email } = this.state;

    sendEmail(email);
    e.preventDefault();
  }

  componentDidAppear() {
    this.animateIn();
  }

  componentWillReceiveProps(nextProps) {
    const { onClose, reset } = this.props;
    const res = nextProps.response;

    if (res && res.status === 'subscribed') {
      this.hidePopup = setTimeout(() => {
        reset();
        onClose();
      }, 1400);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hidePopup);
  }

  componentDidEnter() {
    this.animateIn();
  }

  animateIn() {
    if (this.overlay && this.popup) {
      const t = new TimelineLite();
      const items = this.content.querySelectorAll('h2 , h3, form div');
      const ease = 'Power4.easeInOut';

      t.addLabel('start');

      t.set(
        this.cross,
        { opacity: 0 },
      );

      t.fromTo(
        this.overlay,
        0.8,
        { opacity: 0, ease },
        { opacity: 1 },
        'start',
      );

      t.fromTo(
        this.popup,
        0.8,
        {
          opacity: 1,
          y: '300%',
          rotationX: -25,
          scale: 0.6,
          ease,
        },
        {
          rotationX: 0,
          scale: 1,
          y: '0%',
        },
        'start+=.33',
      );

      t.staggerFromTo(
        items,
        0.55,
        {
          y: 80,
          opacity: 0,
          ease,
        },
        {
          y: 0,
          opacity: 1,
        },
        0.075,
        'start+=.66',
      );

      t.fromTo(
        this.cross,
        0.7,
        {
          oapcity: 0,
          ease: 'Power4.easeInOut',
        },
        { opacity: 1 },
        'start+=1.2',
      );
    }
  }

  componentWillLeave(cb) {
    if (this.overlay && this.popup) {
      const t = new TimelineLite();
      const ease = 'Power4.easeInOut';

      t.addLabel('start');

      t.to(
        this.overlay,
        0.4,
        { opacity: 0, ease },
        'start',
      );

      t.to(
        this.popup,
        0.4,
        {
          opacity: 0,
          y: '200%',
          ease,
        },
        'start',
      );

      t.call(() => {
        cb();
        clearTimeout(this.hidePopup);
      });
    }
  }

  closeUnlessClickedOnContent = (e) => {
    if (!this.popup.contains(e.target)) {
      this.props.onClose();
    }
  }

  render() {
    const {
      heading,
      subheading,
      placeholder,
      actionText,
      onClose,
      response,
      hasError,
    } = this.props;

    const hasResponse = response && response.status === 'subscribed';
    const isSuccess = hasResponse && 'Subscribed!';

    return (
      <div // eslint-disable-line
        className={s.popup}
        onClick={this.closeUnlessClickedOnContent}
      >
        <div className={s.popup__overlay} ref={(c) => { this.overlay = c; }} />

        <div className={s.popup__wrapper}>
          <div className={s.popup__row}>
            <div className={s.popup__inner}>
              <div className={s.popup__content} ref={(c) => { this.popup = c; }}>
                <div className={s.popup__animatedInside} ref={(c) => { this.content = c; }}>
                  <div ref={(c) => { this.cross = c; }}>
                    <Cross className={s.popup__cross} onClose={onClose} />
                  </div>

                  <h2 className={s.popup__heading}>{heading}</h2>
                  <h3 className={s.popup__subheading}>{subheading}</h3>

                  <form
                    method="POST"
                    onSubmit={this.onSubmit}
                    action="/api/mailchimp/subscribe"
                  >
                    <Field
                      label={placeholder}
                      name="email"
                      error={hasError}
                      success={isSuccess}
                    >
                      <Input
                        onChange={this.onChange}
                        type="text"
                        required
                        hasError={Boolean(hasError)}
                        isSuccess={Boolean(isSuccess)}
                      />
                    </Field>

                    <div className={s.popup__submit}>
                      <UenoButton type="submit">{actionText}</UenoButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
