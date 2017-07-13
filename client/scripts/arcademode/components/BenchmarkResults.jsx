
// BenchmarkResults.jsx, included into ChallengePanel.jsx

/* eslint no-multi-spaces: 0 */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class BenchmarkResults extends React.Component {
  componentDidUpdate () {
    if (this.props.benchmarkResults.size !== 0) {
      document.querySelector('.arcade-panel-left').scrollTop = document.querySelector('.arcade-panel-left').scrollHeight;
    }
  }

  render () {
    if (!this.props.benchmarkResults.size) {
      return null;
    }

    const results = this.props.benchmarkResults.toJS();

    let className;
    if (results.resultMessage === 'Your code is slower than par.') {
      className = 'text-warning';
    }
    else if (results.resultMessage === 'Par! Your code is fast!') {
      className = 'text-primary';
    }
    else className = 'text-success';

    return (
      <div>
        <p className='text-default'>Benchmark result:
          <span className={className}>  {results.resultMessage}</span>
        </p>
        <p className='text-muted'>{results.stockPerf}</p>
        <p className='text-muted'>{results.userPerf}</p>
      </div>
    );
  }
}

BenchmarkResults.propTypes = {
  benchmarkResults: ImmutablePropTypes.map.isRequired
};
