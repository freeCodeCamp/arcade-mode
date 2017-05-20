
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';

import CanvasText from './CanvasText';

/* Component at the top of page showing freeCodeCamp next and timer value. */
const ArcadeNavbar = props => (
  <Navbar fluid className='am__navbar'>
    <Navbar.Header>
      <Navbar.Brand>
        <a className='am__fcc__link' href='//freecodecamp.com'>
          <img
            src='//s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg'
            alt='Free Code Camp logo' className='am__fcc__logo'
          />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <CanvasText
      hue={props.hue}
      updateCanvas={props.updateCanvas}
    />
  /*
    <div className='am__am__logo'>
      <canvas className='am__am__canvas' height='50' width='220'>ARCADE MODE</canvas>
      <svg className='am__am__svg'>
        <clipPath id='arcadePath'>
          <text className='am__am__canvas__text' x='0' y='35'>ARCADE MODE</text>
        </clipPath>
      </svg>
    </div>
    */
  </Navbar>
);

ArcadeNavbar.propTypes = {
  hue: PropTypes.number.isRequired,
  updateCanvas: PropTypes.func.isRequired
};

export default ArcadeNavbar;
