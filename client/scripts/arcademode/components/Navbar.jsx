
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';

export default class ArcadeNavbar extends Component {

  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='//freecodecamp.com'>freeCodeCamp Arcade Mode</a>
          </Navbar.Brand>

          <Navbar.Form>
            <input value={this.props.timerMaxValue} onChange={this.props.onTimerMaxValueChange} />
          </Navbar.Form>

          <Navbar.Text>
            Time: {this.props.timeLeft}
          </Navbar.Text>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>
            Signed in as: <Navbar.Link href='#'>Test</Navbar.Link>
          </Navbar.Text>
          <Navbar.Text pullRight>
            Have a great day!
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

ArcadeNavbar.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  timerMaxValue: PropTypes.number.isRequired,
  onTimerMaxValueChange: PropTypes.func.isRequired
};
