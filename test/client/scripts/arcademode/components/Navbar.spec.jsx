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

import { Navbar, FormGroup, FormControl } from 'react-bootstrap';

import ArcadeNavbar from '../../../../../client/scripts/arcademode/components/Navbar';

chai.use(chaiEnzyme());

const timerDefaultValue = 60 * 1000;

const props = {
  sessionScore: 0,
  timeLeft: timerDefaultValue,
  timerMaxValue: timerDefaultValue.toString(),
  onTimerMaxValueChange: () => {}
};


describe('<ArcadeNavbar>', () => {
  it('should render', () => {
    const wrapper = shallow(<ArcadeNavbar {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should have exactly one regular link', () => {
    const wrapper = shallow(<ArcadeNavbar {...props} />);
    expect(wrapper.find('a')).to.have.length(1);
  });

  it('should render all sub components', () => {
    const wrapper = shallow(<ArcadeNavbar {...props} />);
    expect(wrapper.find(Navbar)).to.have.length(1);
    expect(wrapper.find(Navbar.Header)).to.have.length(1);
    expect(wrapper.find(Navbar.Brand)).to.have.length(1);
    expect(wrapper.find(Navbar.Brand).find('a')).to.have.length(1);
    expect(wrapper.find(Navbar.Brand).find('a').text()).to.equal('freeCodeCamp Arcade Mode');
    expect(wrapper.find(Navbar.Toggle)).to.have.length(1);
    expect(wrapper.find(Navbar.Collapse)).to.have.length(1);
    expect(wrapper.find(Navbar.Form)).to.have.length(1);
    expect(wrapper.find(FormGroup)).to.have.length(1);
    expect(wrapper.find(FormControl)).to.have.length(1);
    expect(wrapper.find(FormControl).props().value).to.equal('60000');
    expect(wrapper.find(Navbar.Text)).to.have.length(3);

    const time = document.createElement('span');
    time.innerHTML = wrapper.find(Navbar.Text).first().html();
    expect(time.textContent).to.equal('Time: 60000');

    const sessionScore = document.createElement('span');
    sessionScore.innerHTML = wrapper.find(Navbar.Text).at(1).html();
    expect(sessionScore.textContent).to.equal('Score: 0');

    const signedInAs = document.createElement('span');
    signedInAs.innerHTML = wrapper.find(Navbar.Text).last().html();
    expect(signedInAs.textContent).to.equal('Signed in as: Test');
  });
});

