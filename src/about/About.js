import 'gsap/CSSPlugin';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineLite from 'gsap/TimelineLite';
import { Transition } from 'react-transition-group';

import Button from '../ueno-button/UenoButton';

import Line from './Line';
import s from './About.scss';

export default class About extends Component {

  static propTypes = {
    copy: PropTypes.string,
    onClose: PropTypes.func,
    actionText: PropTypes.string,
    to: PropTypes.string,
    in: PropTypes.bool,
  }

  endHandler = (node, done) => {
    const t = new TimelineLite();
    const main = document.querySelector('#main-app');
    const first = this.close.querySelector(`.${s.about__svg}:first-child`);
    const last = this.close.querySelector(`.${s.about__svg}:last-child`);

    if (this.props.in && this.about) {
      const ease = 'Power4.easeOut';
      const height = this.about.offsetHeight;
      const mainHeight = main.offsetHeight;
      const content = this.about.querySelectorAll(`.${s.about__inner} > *`);

      t.addLabel('start');

      t.fromTo(
        this.about,
        0.45,
        { y: '-100%', ease },
        { y: '0%' },
        'start',
      );

      if (main) {
        t.fromTo(
          main,
          0.45,
          { y: 0, ease },
          {
            y: height,
            height: mainHeight + height,
          },
          'start',
        );
      }

      t.staggerFromTo(
        content,
        0.45,
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
        },
        0.075,
        'start+=.25',
      );

      t.fromTo(
        first,
        0.3,
        { rotation: 0, ease },
        { rotation: 45 },
        'start+=.4',
      );

      t.fromTo(
        last,
        0.3,
        { rotation: 0, ease },
        { rotation: -45 },
        'start+=.4',
      );

      done();
    } else if (this.about) {
      const ease = 'Power4.easeInOut';

      t.addLabel('start');

      if (main) {
        t.to(
          main,
          0.55,
          {
            y: 0,
            height: 'auto',
            ease,
            clearProps: 'transform',
          },
          'start',
        );
      }

      t.to(
        first,
        0.3,
        { rotation: 0, ease },
        'start+=.2',
      );

      t.to(
        last,
        0.3,
        { rotation: 0, ease },
        'start+=.2',
      );

      t.call(done);
    }
  }

  render() {
    const { copy, onClose, actionText, to, ...props } = this.props;

    return (
      <Transition addEndListener={this.endHandler} {...props}>
        <div className={s.about} ref={(c) => { this.about = c; }}>
          <div className={s.about__wrapper}>
            <div className={s.about__col}>
              <div className={s.about__content}>
                <div className={s.about__inner}>
                  <button
                    className={s.about__cross}
                    onClick={onClose}
                    ref={(c) => { this.close = c; }}
                  >
                    <Line className={s.about__svg} />
                    <Line className={s.about__svg} />
                  </button>

                  <p className={s.about__copy}>
                    {copy}
                  </p>

                  <div className={s.about__button}>
                    <Button href={to}>
                      {actionText}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}
