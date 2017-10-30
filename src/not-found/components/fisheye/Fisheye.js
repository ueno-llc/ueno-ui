import React, { Component } from 'react';

import WebglScene from './WebglScene';
import s from './Fisheye.scss';

export default class Fisheye extends Component {

  fixOrientation = 1;
  orientationDevice = 'portrait';

  componentDidMount() {
    const consoleLog = console.log; // eslint-disable-line no-console
    console.log = (first, ...args) => (first !== 'THREE.WebGLRenderer') && consoleLog.call(console, first, ...args); // eslint-disable-line no-console

    // Setup constructors
    this.webglScene = new WebglScene(this.canvasWrapper, this.statsEl, s.canvasElement, this.props.src);

    // bug fix android / iOS
    if (window.navigator.userAgent.match(/^.*(iPhone|iPad).*(OS\s[0-9]).*(CriOS|Version)\/[.0-9]*\sMobile.*$/i)) {
      this.fixOrientation = -1;
    }

    this.orientatonChange();

    // events
    window.addEventListener('touchstart', this.forcePlayVideo);
    window.addEventListener('devicemotion', this.handleMotion);
    window.addEventListener('mousemove', this.onMousemove);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('orientationchange', this.orientatonChange);
  }

  componentWillUnmount() {
    this.webglScene.clearScene();

    window.removeEventListener('touchstart', this.forcePlayVideo);
    window.removeEventListener('devicemotion', this.handleMotion);
    window.removeEventListener('mousemove', this.onMousemove);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.orientatonChange);
  }

  handleMotion = (event) => {
    if (this.orientationDevice === 'portrait') {
      this.webglScene.updateOrientation(
        event.accelerationIncludingGravity.x * this.fixOrientation,
        event.accelerationIncludingGravity.y * this.fixOrientation,
      );
    } else {
      this.webglScene.updateOrientation(
        event.accelerationIncludingGravity.y * this.fixOrientation,
        event.accelerationIncludingGravity.x * this.fixOrientation,
      );
    }
  }

  orientatonChange = () => {
    if (window.orientation === -90 || window.orientation === 90) {
      this.orientationDevice = 'landscape';
    } else {
      this.orientationDevice = 'portrait';
    }
  }

  forcePlayVideo = () => {
    this.webglScene.forcePlayVideo();
  }

  onMousemove = (e) => {
    const moveMiddleX = e.pageX - (window.innerWidth / 2.6);
    const moveMiddleY = e.pageY - (window.innerHeight / 1.5);

    this.webglScene.updateMouseMove(moveMiddleX, moveMiddleY);
  }

  onResize = () => {
    this.webglScene.resizeCanvas();
  }

  render() {
    return (
      <div className={s.fisheye} ref={ref => (this.canvasWrapper = ref)} />
    );
  }
}
