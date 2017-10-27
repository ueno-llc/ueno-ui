import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';

import Popup from '../popup/Popup';
import Button from '../button/Button';

export default class PopupDemo extends Component {

  state = {
    isPopupOpen: false,
  };

  togglePopup = () => {
    this.setState({
      isPopupOpen: !this.state.isPopupOpen,
    });
  };

  render() {
    const { isPopupOpen } = this.state;
    const text = isPopupOpen ? 'Close popup' : 'Open popup';

    return (
      <div>
        <TransitionGroup>
          {isPopupOpen && (
            <Popup
              heading="Stay up to date"
              subheading="We make stuff, you get mail"
              placeholder="Your Email"
              actionText="Send"
              onClose={this.togglePopup}
              sendEmail={() => {}}
              response={{}}
              hasError={false}
              reset={() => {}}
            />
          )}
        </TransitionGroup>

        <Button onClick={this.togglePopup}>{text}</Button>
      </div>
    );
  }
}
