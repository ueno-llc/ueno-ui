/* eslint-disable react/no-multi-comp */
import React, { PureComponent, PropTypes } from 'react';

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

export { ArrowRight, ArrowSubmit, Cross };
