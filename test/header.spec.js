
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Header from '../client/scripts/components/Header';

describe('<Header/>', () => {

  it('should have a header tag', () => {
	const wrapper = shallow(<Header/>);
	expect(wrapper.find('header')).to.have.length(1);
  });

  it('should have props for title', () => {
	const wrapper = shallow(<Header/>);
    expect(wrapper.props().title).to.be.defined;
  });

});

