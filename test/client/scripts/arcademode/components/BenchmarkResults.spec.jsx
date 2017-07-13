
/* Unit tests for file client/scripts/arcademode/components/BenchmarkResults.jsx. */

import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

import Immutable from 'immutable';

import BenchmarkResults from '../../../../../client/scripts/arcademode/components/BenchmarkResults';

chai.use(chaiEnzyme());

const props = {
  benchmarkResults: Immutable.Map()
};

describe('<BenchmarkResults> component', () => {
  it('should render', () => {
    const wrapper = shallow(<BenchmarkResults {...props} />);
    expect(wrapper).to.have.length(1);
  });
});
