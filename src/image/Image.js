import React, { Component, PropTypes } from 'react';

import s from './Image.scss';

export default class Item extends Component {
  static propTypes = {
    src: PropTypes.string,
    src2x: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    background: PropTypes.string,
    progressive: PropTypes.bool,
  };

  static defaultProps = {
    src: '',
    src2x: '',
    alt: '',
    className: '',
    progressive: false,
  };

  state = {};

  componentDidMount() {
    if (this.img.complete) {
      this.wrapper.classList.add(s({ hasLoaded: true }));
    }
  }

  makeSrc(src = '', src2x = '') {
    if (src === '') {
      return src2x;
    }

    return src;
  }

  makeSrcSet(src = '', src2x = '') {
    if (src2x !== '') {
      return `${src} 1x, ${src2x} 2x`;
    }

    return undefined;
  }

  loaded = () => {
    this.setState({
      loaded: true,
    });
  };

  render() {
    const {
      src,
      src2x,
      alt,
      className,
      width,
      height,
      background,
      progressive,
    } = this.props;

    const { loaded = false } = this.state;

    const hasPlaceholder = Boolean(width && height);
    const paddingStyles = hasPlaceholder
      ? { paddingBottom: `${height / width * 100}%` }
      : undefined;

    if (hasPlaceholder && background) {
      paddingStyles.backgroundColor = background;
    }

    const img = (
      <img
        src={this.makeSrc(src, src2x)}
        srcSet={this.makeSrcSet(src, src2x)}
        alt={alt}
        role={alt === '' ? 'presentation' : undefined}
        className={s(s.image, {
          hasPlaceholder,
        })}
        onLoad={hasPlaceholder ? this.loaded : undefined}
        width={width}
        height={height}
        ref={el => this.img = el}
      />
    );

    return hasPlaceholder
      ? <div
        className={s(s.wrapper, className, {
          fadeIn: hasPlaceholder && !progressive,
          hasLoaded: hasPlaceholder && loaded,
        })}
        ref={el => this.wrapper = el}
        style={{ width: width || 'auto' }}
      >
        <div className={s.content}>
          {img}
        </div>
        <div className={s.padding} style={paddingStyles} />
      </div>
      : <div className={s(s.wrapper, className)} ref={el => this.wrapper = el}>
        {img}
      </div>;
  }
}
