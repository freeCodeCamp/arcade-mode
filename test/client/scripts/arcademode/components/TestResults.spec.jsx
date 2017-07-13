
/* Unit tests for file client/scripts/arcademode/components/TestResults.jsx. */

import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

import Immutable from 'immutable';

import TestResults from '../../../../../client/scripts/arcademode/components/TestResults';

chai.use(chaiEnzyme());

const props = {
  testResults: Immutable.List(),
  editor: 'editor'
};

describe('<TestResults> component', () => {
  it('should render', () => {
    const wrapper = shallow(<TestResults {...props} />);
    expect(wrapper).to.have.length(1);
  });
});
