import React, { Component, PropTypes } from 'react';
import Waypoint from 'react-waypoint';
import classnames from 'classnames';
import { canUseDOM } from '../utils';

import s from './Item.scss';

export default class Item extends Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    link: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    disableScrollEffect: PropTypes.bool,
    isHovered: PropTypes.bool,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  static defaultProps = {
    tags: [],
  };

  constructor(props) {
    super(props);

    const { disableScrollEffect } = props;

    this.state = {
      isReady: false,
      isActive: disableScrollEffect,
      isDone: disableScrollEffect,
    };
  }

  componentDidMount() {
    this.readyTimer = setTimeout(
      () => {
        this.setState({ isReady: true });
      },
      10,
    );
  }

  componentWillUnmount() {
    clearTimeout(this.readyTimer);
  }

  onChange = ({ currentPosition }) => {
    if (!this.hostEl) return;

    if (currentPosition === 'inside') {
      this.setState({ isActive: true });
      this.timer = setTimeout(
        () => {
          this.setState({ isDone: true });
        },
        1000,
      );
    }

    if (currentPosition === 'below') {
      clearTimeout(this.timer);
      this.setState({ isDone: false, isActive: false });
    }

    if (currentPosition === 'above') {
      clearTimeout(this.timer);
      this.setState({ isDone: true, isActive: true });
    }
  };

  onClick = (e) => {
    const { link } = this.props;
    const isExternal = /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(link);

    if (!isExternal) {
      e.preventDefault();

      this.context.router.history.push(link);
    }
  };

  render() {
    const {
      name,
      tags,
      link,
      children,
      disableScrollEffect,
      isHovered,
    } = this.props;
    const { isReady, isDone, isActive } = this.state;

    const isExternal = /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(link);
    const showText = name !== '' || tags.length > 0;
    const showWaypoint = !disableScrollEffect && isReady;

    return (
      <a
        href={link}
        ref={(el) => {
          this.hostEl = el;
        }}
        className={classnames(s.item, {
          [s.isHovered]: isHovered,
          [s.isReady]: isReady,
          [s.isDone]: isDone,
          [s.isActive]: isActive,
        })}
        target={isExternal ? '_blank' : null}
        rel={isExternal ? 'noopener' : null}
        onClick={this.onClick}
      >
        {showWaypoint
          ? <Waypoint
            scrollableAncestor={canUseDOM ? window : undefined}
            topOffset={200}
            onPositionChange={this.onChange}
          />
          : null}
        <div className={s.item__imageWrap}>
          <div className={s.item__scale}>
            <div className={s.item__assets}>
              {children}
            </div>
          </div>
        </div>

        {showText
          ? <div className={s.item__center}>
            <h3 className={s.item__heading}>{name}</h3>
            <ul className={s.item__typelist}>
              {tags.map(tag => (
                <li className={s.item__type} key={`tag-${tag}`}>{tag}</li>
                ))}
            </ul>
          </div>
          : null}
      </a>
    );
  }
}
