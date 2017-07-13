
/* Unit tests for file client/scripts/arcademode/components/ChallengeDescription.jsx. */

import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

import Immutable from 'immutable';

import ChallengeDescription from '../../../../../client/scripts/arcademode/components/ChallengeDescription';

chai.use(chaiEnzyme());

const props = {
  description: Immutable.List(['a', 'b', 'c']),
  showDescription: true
};

describe('<ChallengeDescription> component', () => {
  it('should render', () => {
    const wrapper = shallow(<ChallengeDescription {...props} />);
    expect(wrapper).to.have.length(1);
  });
});
