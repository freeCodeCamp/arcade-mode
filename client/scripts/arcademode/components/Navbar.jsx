
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
    <div className='am__am__logo'>
      <canvas className='am__am__canvas' width='220' height='50'></canvas>
      <svg className='am__am__svg text-mask-svg' height='0' width='0' viewBox='0 0 220 50'>
        <defs>
          <clipPath id='testpath'>
            <rect x='0' y='0' stroke='#000000' strokeMiterlimit='10' width='20' height='20'/>
          </clipPath>
          <clipPath id='arcadePath'>
            <text className='am__am__canvas__text' x='50%' y='50%' textAnchor='middle'>ARCADE MODE</text>
        </clipPath>
        </defs>
      </svg>
    </div>
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
