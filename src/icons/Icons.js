/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ArrowRight extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;

    return (
      <svg
        className={className}
        data-type="arrow"
        width="6px"
        height="10px"
        viewBox="0 0 6 10"
      >
        <path
          fillRule="evenodd"
          opacity="0.502"
          fill="rgb(255, 255, 255)"
          d="M5.284,5.000 L1.000,9.285 L0.293,8.578 L3.870,5.000 L0.293,1.423 L1.000,0.716 L4.577,4.293 L4.577,4.293 L5.284,5.000 Z"
        />
      </svg>
    );
  }
}

class ArrowSubmit extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;

    return (
      <svg
        className={className}
        data-type="arrow"
        width="14px"
        height="11px"
        viewBox="0 0 14 11"
      >
        <path
          fillRule="evenodd"
          opacity="0.502"
          fill="rgb(255, 255, 255)"
          d="M13.794,5.499 L8.825,10.330 L8.115,9.641 L11.889,5.969 L-0.000,5.969 L-0.000,5.000 L11.863,5.000 L8.115,1.354 L8.825,0.664 L13.083,4.807 L13.084,4.806 L13.794,5.499 ZM12.062,5.194 L12.062,5.800 L12.374,5.497 L12.062,5.194 Z"
        />
      </svg>
    );
  }
}

class Cross extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;

    return (
      <svg
        className={className}
        data-type="arrow"
        width="12.5px"
        height="12.5px"
        viewBox="0 0 12.5 12.5"
      >
        <path
          fillRule="evenodd"
          opacity="0.502"
          fill="rgb(255, 255, 255)"
          d="M11.500,6.500 L6.500,6.500 L6.500,11.500 L5.500,11.500 L5.500,6.500 L0.500,6.500 L0.500,5.500 L5.500,5.500 L5.500,0.500 L6.500,0.500 L6.500,5.500 L11.500,5.500 L11.500,6.500 Z"
        />
      </svg>
    );
  }
}

class Paperclip extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;

    return (
      <svg
        className={className}
        data-type="paperclip"
        viewBox="0 0 37 100"
      >
        <path
          d="M35 26v54c0 5.5-2 18-16 18A16.56 16.56 0 0 1 2 81V13C2 9.5 5 2 13 2a11.64 11.64 0 0 1 12 11v52s0 7-7 7-6-7-6-7V39"
          fill="none"
          stroke="#999"
          strokeMiterlimit="10"
          strokeWidth="4"
        />
      </svg>
    );
  }
}

export {
  ArrowRight,
  ArrowSubmit,
  Cross,
  Paperclip,
};
