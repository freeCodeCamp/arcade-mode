
'use strict';

import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import browser from 'detect-browser';

import AMLogo from './AMLogo';

/* Component at the top of page showing freeCodeCamp next and timer value. */
const ArcadeNavbar = props => {
  function handleClick (e) {
    switch (e.target.textContent) {
      case 'Menu':
        if (!props.modal) {
          e.target.classList.add('active');
        }
        else e.target.classList.remove('active');
        props.onModalOpen();
        break;
      case 'Profile':
        if (!props.isProfileShown) {
          e.target.classList.add('active');
        }
        else e.target.classList.remove('active');
        props.onClickShowHideProfile();
        break;
      default:
        console.log('Default reached for handling nav click');
    }
  }

  return (
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
      <Navbar.Collapse>
        <Nav pullRight className='am__navbar__menu'>
          <NavItem eventKey={1} className='am__navbar__link am__navbar__link--menu' onClick={handleClick}>Menu</NavItem>
          <NavItem eventKey={2} className='am__navbar__link am__navbar__link--profile' onClick={handleClick}>Profile</NavItem>
        </Nav>
      </Navbar.Collapse>
      { browser.name !== 'firefox' &&
        <AMLogo site={props.appConfig.toJS().site} />
      }
      { browser.name === 'firefox' &&
        <a className='am__am__link' href={props.appConfig.toJS().site} >
          <div className='am__am__logo--ff'>
            <canvas className='am__am__canvas' height='50' width='220'>ARCADE</canvas>
            <svg className='am__am__svg'>
              <clipPath id='arcadePathFF'>
                <text className='am__am__canvas__text' x='0' y='35'>ARCADE</text>
              </clipPath>
            </svg>
          </div>
        </a>
      }
    </Navbar>
  );
};

ArcadeNavbar.propTypes = {
  appConfig: ImmutablePropTypes.map.isRequired,
  modal: PropTypes.bool.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  isProfileShown: PropTypes.bool.isRequired,
  onClickShowHideProfile: PropTypes.func.isRequired
};

export default ArcadeNavbar;
