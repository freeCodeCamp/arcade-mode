
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, FormGroup, FormControl } from 'react-bootstrap';

export default class ArcadeNavbar extends Component {

  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='//freecodecamp.com'>freeCodeCamp Arcade Mode</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type='text' placeholder='Enter time in milliseconds here' value={this.props.timerMaxValue} onChange={this.props.onTimerMaxValueChange} />
      {/* <input value={this.props.timerMaxValue} onChange={this.props.onTimerMaxValueChange} /> */}
            </FormGroup>
          </Navbar.Form>
          <Navbar.Text pullLeft>
            Time: {this.props.timeLeft}
          </Navbar.Text>
          <Navbar.Text pullRight>
            Signed in as: <Navbar.Link href='#'>Test</Navbar.Link>
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
