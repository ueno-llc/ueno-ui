import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import classNames from 'classnames';

import { canUseDOM } from '../utils';

import s from './Image.scss';

export default class Image extends Component {

  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string,
        src2x: PropTypes.string,
        src3x: PropTypes.string,
        src4x: PropTypes.string,
      }),
    ]).isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    background: PropTypes.string,
    progressive: PropTypes.bool,
    lazy: PropTypes.bool,
    scrollableAncestor: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    alt: '',
    className: '',
    progressive: false,
    scrollableAncestor: canUseDOM ? window : undefined,
  };

  state = {
    loaded: false,
    visible: false,
  };

  makeSrc = (src) => {
    if (typeof src === 'string') {
      return src;
    }

    return src.src;
  };

  makeSrcSet = (src) => {
    if (typeof src === 'string') {
      return undefined;
    }

    return Object.keys(src).map((k) => {
      const size = k.slice(3) || '1x';
      return `${src[k]} ${size}`;
    }).join(', ');
  };

  onLoad = () => this.setState({ loaded: true });
  onEnter = () => this.setState({ visible: true });

  renderImg = () => {
    const { lazy } = this.props;
    const { visible } = this.state;

    if (lazy && !visible) {
      return null;
    }

    const {
      src,
      alt,
      width,
      height,
    } = this.props;

    const hasPlaceholder = Boolean(width && height);

    return (
      <img
        src={this.makeSrc(src)}
        srcSet={this.makeSrcSet(src)}
        alt={alt}
        role={alt === '' ? 'presentation' : undefined}
        className={classNames(s.image, { hasPlaceholder })}
        onLoad={this.onLoad}
        width={width}
        height={height}
      />
    );
  };

  renderInner = () => {
    const { width, height, background } = this.props;
    const hasPlaceholder = Boolean(width && height);
    const paddingStyles = hasPlaceholder
      ? { paddingBottom: `${height / width * 100}%` } // eslint-disable-line
      : undefined;

    if (hasPlaceholder && background) {
      paddingStyles.backgroundColor = background;
    }

    if (hasPlaceholder) {
      return (
        <div>
          <div className={s.content}>
            {this.renderImg()}
          </div>
          <div className={s.padding} style={paddingStyles} />
        </div>
      );
    }

    return this.renderImg();
  };

  render() {
    const {
      className,
      width,
      height,
      progressive,
      lazy,
      scrollableAncestor,
    } = this.props;

    const { loaded, visible } = this.state;
    const hasPlaceholder = Boolean(width && height);

    return (
      <div
        className={classNames(s.wrapper, className, {
          fadeIn: (hasPlaceholder || lazy) && !progressive,
          hasLoaded: loaded,
        })}
        ref={(el) => { this.wrapper = el; }}
        style={{ width: +width || 'auto' }}
      >
        {lazy && !visible && (
          <Waypoint
            scrollableAncestor={scrollableAncestor}
            onEnter={this.onEnter}
          />
        )}

        {this.renderInner()}
      </div>
    );
  }
}
