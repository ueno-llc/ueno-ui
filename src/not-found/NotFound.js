import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Intro from './components/intro/Intro';
import Variation from './components/variation/Variation';
import Fisheye from './components/fisheye/Fisheye';

export default class NotFound extends Component {

  static propTypes = {
    random: PropTypes.number,
    src: PropTypes.string,
  }

  render() {
    const { random, src } = this.props;

    return (
      <div>
        <Intro heading="404" random={random}>
          <Variation
            subheading="Wait, what?"
            text="Why did the hot dog cross the road? Why did the priest
              and the rabbi walk into a bar? Why is this page missing?"
            button="So many questions"
          />

          <Variation
            subheading="Phew, you found it."
            text="You found our 404 page. You’ve won a
              washing machine and a dryer."
            button="Not really"
          />

          <Variation
            subheading="No es bueno"
            text="You came here, looking for something, and all you get
              is this silly running hot dog. Not good. Not good, at all."
            button="Get back"
          />

          <Variation
            subheading="Something’s wrong."
            text="Remember those old 404 pages from the 90s that said something
              like “Something’s gone wrong, but don’t worry, our webmasters
              have been notified.” But were the webmasters ever notified?
              I mean, were they really?"
            button="Back to life, back to reality"
          />

          <Variation
            subheading="WTF"
            text="Hello. You have reached Ueno’s 404 page. Thank you for
              calling. Your call is really important to us. Please hold."
            button="Back to square one"
          />

          <Variation
            subheading="We sincerely apologize."
            text="The page you are looking for is no longer here. Maybe it
              was never here in the first place. In any case, we are sorry
              you were sent on this wild goose chase, and have already
              taken steps to have the person responsible fired."
            button="Go home"
          />
        </Intro>

        <Fisheye src={src} />
      </div>
    );
  }
}
