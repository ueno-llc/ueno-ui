import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import s from './Intro.scss';

export default class NotFound extends Component {

  static propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
    video: PropTypes.string,
    ui: PropTypes.object,
  };

  componentWillMount() {
    const { ui } = this.props;

    this.random = ui.serverSharedRandom;
  }

  render() {
    const { heading, children, video, ui } = this.props;
    const random = Math.floor(this.random * children.length);

    const videoBlock = (
      <div className={s.intro__videoContainer}>
        <video // eslint-disable-line jsx-a11y/media-has-caption
          className={s.intro__videoSource}
          src={video}
          autoPlay
          playsInline
          muted
          loop
        />
      </div>
    );

    return (
      <section className={s.intro}>
        <div className={classnames(s.intro__content, { [s.intro__contentMobile]: ui.isMobile })}>
          <div className={s.intro__inner}>
            <h1 className={s.intro__heading}>{heading}</h1>
            {children[random]}
          </div>
        </div>

        {videoBlock}
      </section>
    );
  }
}
