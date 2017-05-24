
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { ListGroup } from 'react-bootstrap';

import UserProfile from '../../../../../client/scripts/arcademode/components/UserProfile';
import UserData from '../../../../../client/scripts/arcademode/models/UserData';

chai.use(chaiEnzyme());

const deleteSession = sinon.spy();

const props = {
  userData: new UserData(),
  deleteSession,
  toggleSessionView: () => {},
  toggleChallengeView: () => {},
  sessionExpandStatus: {}
};

describe('Component: <UserProfile>', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should render all subcomponents', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    expect(wrapper.find('h1')).to.include.text('User Profile');
    expect(wrapper.find(ListGroup)).to.have.length(1);
  });
});

