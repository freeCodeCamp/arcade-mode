
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import Header from '../client/scripts/arcademode/components/Header';

chai.use(chaiEnzyme());


describe('<Header/>', () => {
  it('should have a header tag', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header')).to.have.length(1);
  });

  it('should have props for title', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header').first()).to.contain.text('header');
  });
});
