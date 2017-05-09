
'use strict';

import React from 'react';
import { Navbar } from 'react-bootstrap';

export default () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <a href='//freecodecamp.com'>freeCodeCamp Arcade Mode</a>
      </Navbar.Brand>
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
