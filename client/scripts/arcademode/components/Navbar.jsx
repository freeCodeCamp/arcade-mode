
'use strict';

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

/* Component at the top of page showing freeCodeCamp next and timer value. */
const ArcadeNavbar = () => (
  <Navbar fluid className='am__navbar'>
    <Navbar.Header>
      <Navbar.Brand>
        <a className='am__fcc__link' href='//freecodecamp.com'>
          <img src='//s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg' alt='Free Code Camp logo' className='am__fcc__logo' />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>

    <Nav pullRight>
      <Navbar.Brand>
        <a className='am__am__link' href='//arcademode.herokuapp.com'>Arcade Mode</a>
      </Navbar.Brand>
    </Nav>
  {/*
    <Navbar.Collapse>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl
            type='text' placeholder='Enter time in milliseconds here'
            value={props.timerMaxValue}
            onChange={props.onTimerMaxValueChange}
          />
        </FormGroup>
      </Navbar.Form>
      <Navbar.Text pullLeft>
        Time: {props.timeLeft}
      </Navbar.Text>
      <Navbar.Text pullLeft>
        Score: {props.sessionScore}
      </Navbar.Text>
    </Navbar.Collapse>
    */}
  </Navbar>
);

/*
ArcadeNavbar.propTypes = {
  sessionScore: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  timerMaxValue: PropTypes.string.isRequired,
  onTimerMaxValueChange: PropTypes.func.isRequired
};
*/

export default ArcadeNavbar;
