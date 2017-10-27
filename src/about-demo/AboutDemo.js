import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';

import About from '../about/About';
import Button from '../button/Button';

export default class AboutDemo extends Component {

  state = {
    isAboutOpen: false,
  };

  toggleAbout = () => {
    this.setState({
      isAboutOpen: !this.state.isAboutOpen,
    });
  };

  render() {
    const { isAboutOpen } = this.state;
    const text = isAboutOpen ? 'Close about' : 'Open about';

    return (
      <div>
        <TransitionGroup>
          {isAboutOpen &&
            <About
              copy="We like beautiful things. We like making them, and we like
                using them. So we picked some for you. You can buy them on Amazon.
                Or you can just look at them here."
              actionText="Go to ueno.co"
              onClose={this.toggleAbout}
              to="https://ueno.co"
            />}
        </TransitionGroup>

        {/*
          * The `#main-app` id is required to the div containing
          * the whole page (except the about component of course)
          * to make it slide down/up when the about section appears
        */}
        <div
          style={{ backgroundColor: 'white', height: '600px' }}
          id="main-app"
        >
          <Button onClick={this.toggleAbout}>{text}</Button>
        </div>
      </div>
    );
  }
}
