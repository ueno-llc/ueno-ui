import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Line extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className } = this.props;

    return (
      <svg className={className} width="21px" height="3px" viewBox="0 0 21 3">
        <path fillRule="evenodd" fill="#221F20" d="M0 3h20.562V.943H0" />
      </svg>
    );
  }
}
