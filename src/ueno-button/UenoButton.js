import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { TimelineLite, Power4 } from 'gsap';
import classnames from 'classnames';

import { ArrowRight, ArrowSubmit, Cross } from '../icons/Icons';

import s from './UenoButton.scss';

export default class UenoButton extends Component {
  static propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    arrow: PropTypes.bool,
    arrowBack: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    white: PropTypes.bool,
    noAnimation: PropTypes.bool,
    isDiv: PropTypes.bool,
    disabled: PropTypes.bool,
    submit: PropTypes.bool,
    semiBold: PropTypes.bool,
    hasCross: PropTypes.bool,
  };

  static defaultProps = {
    onClick: null,
    arrow: true,
  };

  onMouseEnter = ({ force = false } = {}) => {
    if (this.props.noAnimation && !force) return;

    const el = ReactDOM.findDOMNode(this.hostEl); // eslint-disable-line
    const t = new TimelineLite();
    const ease = Power4.easeInOut;
    const hover = el.querySelector(`.${s.button__overlay}`);
    const arrow = el.querySelector('svg[data-type=arrow]');
    const text = el.querySelector(`.${s.button__text}`);
    const duration = 0.8;

    t
      .fromTo(hover, duration, { x: '-103%' }, { x: '-30%', ease })
      .fromTo(arrow, duration, { x: '0' }, { x: '-15px', ease }, '-=0.8')
      .fromTo(text, duration, { x: '0' }, { x: '20px', ease }, '-=0.8');
  };

  onMouseLeave = ({ force = false } = {}) => {
    if (this.props.noAnimation && !force) return;

    const el = ReactDOM.findDOMNode(this.hostEl); // eslint-disable-line
    const t = new TimelineLite();
    const ease = Power4.easeInOut;
    const hover = el.querySelector(`.${s.button__overlay}`);
    const arrow = el.querySelector('svg[data-type=arrow]');
    const text = el.querySelector(`.${s.button__text}`);
    const duration = 0.8;

    t
      .to(hover, duration, { x: '103%', ease })
      .to(arrow, duration, { x: '0', ease }, '-=0.8')
      .to(text, duration, { x: '0', ease }, '-=0.8');
  };

  renderContent() {
    const { submit, arrowBack, children, hasCross } = this.props;

    if (submit) {
      return (
        <span className={s.button__flex}>
          <ArrowSubmit
            key="arrow"
            ref={el => this.arrowSvg = el}
            className={s.button__arrowSubmit}
          />
          <span key="text" className={s.button__content}>
            <span className={s.button__overlay} />
            <span className={s.button__text}>
              {children}
            </span>
          </span>
        </span>
      );
    }

    const icon = hasCross
      ? (<Cross
        key="arrow"
        ref={(el) => {
          this.arrowSvga = el;
        }}
        className={s.button__cross}
      />)
      : (<ArrowRight
        key="arrow"
        ref={(el) => {
          this.arrowSvga = el;
        }}
        className={classnames(s.button__arrowRight, {
          arrowBack,
        })}
      />);

    return (
      <span className={s.button__flex}>
        {icon}

        <span key="text" className={s.button__content}>
          <span className={s.button__overlay} />
          <span className={s.button__text}>
            {children}
          </span>
        </span>
      </span>
    );
  }

  render() {
    const {
      to,
      arrow,
      arrowBack,
      className,
      white,
      isDiv,
      submit,
      noAnimation, // eslint-disable-line
      hasCross, // eslint-disable-line
      semiBold,
      ...rest
    } = this.props;

    // Some flags
    const isLink = typeof to !== 'undefined';
    const isExternal = this.props.href;

    // Extend className of the rest
    rest.className = classnames(s.button, {
      [s.arrow]: arrow,
      [arrowBack]: arrowBack,
      [s.white]: white,
      [s.submit]: submit,
      [s.semiBold]: semiBold,
    });

    if (isDiv) {
      return (
        <div
          ref={(el) => {
            this.hostEl = el;
          }}
          {...rest}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onFocus={this.onMouseEnter}
          onBlur={this.onMouseLeave}
        >
          {this.renderContent()}
        </div>
      );
    }

    if (isExternal) {
      // http, https, //, mailto, etc.
      return (
        <a
          ref={(el) => {
            this.hostEl = el;
          }}
          href={to}
          {...rest}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onFocus={this.onMouseEnter}
          onBlur={this.onMouseLeave}
        >
          {this.renderContent()}
        </a>
      );
    }

    if (isLink) {
      // Everything else
      return (
        <Link
          ref={(el) => {
            this.hostEl = el;
          }}
          to={to}
          {...rest}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onFocus={this.onMouseEnter}
          onBlur={this.onMouseLeave}
        >
          {this.renderContent()}
        </Link>
      );
    }

    // Default
    return (
      <button
        ref={(el) => {
          this.hostEl = el;
        }}
        {...rest}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onMouseEnter}
        onBlur={this.onMouseLeave}
      >
        {this.renderContent()}
      </button>
    );
  }
}
