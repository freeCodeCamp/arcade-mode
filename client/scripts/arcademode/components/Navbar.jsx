
'use strict';

import React from 'react';
import { Navbar } from 'react-bootstrap';

import browser from 'detect-browser';

import AMLogo from './AMLogo';

/* Component at the top of page showing freeCodeCamp next and timer value. */
const ArcadeNavbar = () => (
  <Navbar fluid className='am__navbar'>
    <Navbar.Header>
      <Navbar.Brand>
        <a className='am__fcc__link' href='//freecodecamp.com'>
          <img
            src='public/img/FCClogo.svg'
            alt='Free Code Camp logo' className='am__fcc__logo'
          />
        </a>
      </Navbar.Brand>
    </Navbar.Header>
    { browser.name !== 'firefox' &&
      <AMLogo />
    }
    { browser.name === 'firefox' &&
      <a href='//arcademode.herokuapp.com' className='am__am__link'>
        <div className='am__am__logo--ff'>
          <canvas className='am__am__canvas' height='50' width='220'>ARCADE MODE</canvas>
          <svg className='am__am__svg'>
            <clipPath id='arcadePathFF'>
              <text className='am__am__canvas__text' x='0' y='35'>ARCADE MODE</text>
            </clipPath>
          </svg>
        </div>
      </a>
    }
  </Navbar>
);

export default ArcadeNavbar;
