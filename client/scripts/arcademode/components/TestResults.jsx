
// TestResults.jsx, included into ChallengePanel.jsx

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class TestResults extends React.Component {
  componentDidUpdate () {
    if (this.props.testResults.size !== 0) {
      console.log('testResults:');
      console.log(this.props.testResults);
      document.querySelector('.arcade-panel-left').scrollTop = document.querySelector('.arcade-panel-left').scrollHeight;
    }
  }

  /* TODO: Add limit to the number of printed tests. Improve output. */
  render () {
    /* eslint react/no-danger: 0 */
    const results = this.props.testResults;
    const numTests = results.size;
    let testsOk = true;
    let individualTests;

    if (numTests > 0) {
      let id = 0;
      individualTests = results.map(item => {
        const result = item.pass ? 'Pass' : 'Fail';
        const className = item.pass ? 'text-success' : 'text-danger';
        testsOk = testsOk && item.pass;
        id += 1;

        // return only status of each test on Whiteboard mode
        if (this.props.editor === 'Whiteboard') {
          return <p className={className} key={id}>Status: {result}</p>;
        }

        // If test had error, format the error message here
        let msg = null;
        if (item.error !== null) {
          const innerHtml = { __html: `Error: ${item.error}` };
          msg = <span dangerouslySetInnerHTML={innerHtml} />;
        }

        return <p className={className} key={id}>Status: {result} {msg}</p>;
      });
    }
    let finalResult = testsOk ? 'All tests passed' : 'There were failing tests';
    if (numTests === 0) {
      finalResult = 'No tests run.';
    }

    return (
      <div>
        <p>Tests result: {finalResult}</p>
        {individualTests}
      </div>
    );
  }
}

TestResults.propTypes = {
  testResults: ImmutablePropTypes.list.isRequired,
  editor: PropTypes.string.isRequired
};
