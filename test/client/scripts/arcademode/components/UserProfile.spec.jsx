
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

// import Immutable from 'immutable';

// import { Grid, Row, Col } from 'react-bootstrap';

import UserProfile from '../../../../../client/scripts/arcademode/components/UserProfile';

chai.use(chaiEnzyme());

describe('<UserProfile> component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<UserProfile />);
    expect(wrapper).to.have.length(1);
  });
});

