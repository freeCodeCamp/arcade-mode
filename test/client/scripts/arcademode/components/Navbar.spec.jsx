//
// 'use strict';
//
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Navbar, FormGroup, FormControl } from 'react-bootstrap';
//
// /* Component at the top of page showing freeCodeCamp next and timer value. */
// const ArcadeNavbar = props => (
//   <Navbar fluid>
//     <Navbar.Header>
//       <Navbar.Brand>
//         <a href='//freecodecamp.com'>freeCodeCamp Arcade Mode</a>
//       </Navbar.Brand>
//       <Navbar.Toggle />
//     </Navbar.Header>
//     <Navbar.Collapse>
//       <Navbar.Form pullLeft>
//         <FormGroup>
//           <FormControl
//             type='text' placeholder='Enter time in milliseconds here'
//             value={props.timerMaxValue}
//             onChange={props.onTimerMaxValueChange}
//           />
//         </FormGroup>
//       </Navbar.Form>
//       <Navbar.Text pullLeft>
//         Time: {props.timeLeft}
//       </Navbar.Text>
//       <Navbar.Text pullLeft>
//         Score: {props.sessionScore}
//       </Navbar.Text>
//       <Navbar.Text pullRight>
//         Signed in as: <Navbar.Link href='#'>Test</Navbar.Link>
//       </Navbar.Text>
//     </Navbar.Collapse>
//   </Navbar>
// );
//
//
// ArcadeNavbar.propTypes = {
//   sessionScore: PropTypes.number.isRequired,
//   timeLeft: PropTypes.number.isRequired,
//   timerMaxValue: PropTypes.string.isRequired,
//   onTimerMaxValueChange: PropTypes.func.isRequired
// };
//
// export default ArcadeNavbar;

/* Unit tests for file client/scripts/arcademode/components/Navbar.jsx. */
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

import ArcadeNavbar from '../../../../../client/scripts/arcademode/components/Navbar';

chai.use(chaiEnzyme());

const props = {
  sessionScore: 0,
  timeLeft: 0,
  timerMaxValue: '',
  onTimerMaxValueChange: () => {}
};

describe('<ArcadeNavbar>', () => {
  it('should have exactly one link', () => {
    const wrapper = shallow(<ArcadeNavbar {...props} />);
    expect(wrapper.find('a')).to.have.length(1);
  });
});

