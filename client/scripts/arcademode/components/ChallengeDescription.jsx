
/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class ChallengeDescription extends React.Component {
  constructor(props) {
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
  }

  componentDidUpdate () {
    document.querySelector('.arcade-panel-left').scrollTop = 0;
  }

  createMarkup() {
    let descr;
    if (typeof this.props.description === 'string') {
      descr = this.props.description;
    }
    else descr = this.props.description.join('\n');
    return { __html: descr };
  }

  render () {
    if (this.props.showDescription) {
      return (
        <div className='challenge__description' dangerouslySetInnerHTML={this.createMarkup()} />
      );
    }
    return null;
  }
}

ChallengeDescription.defaultProps = {
  showDescription: true
};

ChallengeDescription.propTypes = {
  description: ImmutablePropTypes.list.isRequired,
  showDescription: PropTypes.bool
};
