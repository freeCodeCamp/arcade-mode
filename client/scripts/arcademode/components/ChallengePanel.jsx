
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import CodeMirror from 'react-codemirror';

const outputOptions = {
  readOnly: true,
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: true,
  mode: '',
  json: true
};

/* Component which renders the left panel containing control buttons, test
 * description and test results.*/
export default class ChallengePanel extends React.Component {
  constructor(props) {
    super(props);
    this.createMarkup = this.createMarkup.bind(this);
  }

  createMarkup() {
    const descr = this.props.description.join('\n');
    return { __html: descr };
  }

  /* TODO: Add limit to the number of printed tests. Improve output. */
  renderTestResults() {
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
        {individualTests}
        <p>{finalResult}</p>
      </div>
    );
  }

  render() {
    let finishButton = null;
    if (this.props.isTimerFinished && !this.props.isSessionFinished) {
      finishButton = (
        <button className='btn btn-danger' onClick={this.props.onClickFinishSession}>Finish</button>
      );
    }

    const testResults = this.renderTestResults();
    const runBtnClass = this.props.isRunningTests ? 'btn btn-primary disabled' : 'btn btn-primary';

    /* eslint react/no-danger: 0 */
    return (
      <div className='challenge-panel'>
        <div className='challenge__title'>{this.props.title}</div>
        {this.props.showDescription &&
        <div className='challenge__description' dangerouslySetInnerHTML={this.createMarkup()} />
        }
        <div className='challenge__buttons'>
          {!this.props.isSessionStarted &&
            <button className='btn btn-success' onClick={this.props.onClickStartChallenge}>Start</button>
          }
          {(!this.props.isSessionStarted || this.props.mode === 'Practice') &&
            <button className='btn btn-primary' onClick={this.props.onModalOpen}>Menu</button>
          }
          {this.props.isSessionStarted &&
            <button className={runBtnClass} onClick={this.props.onClickRunTests}>Run tests</button>
          }
          {finishButton}
        </div>
        <div className='challenge__buttons'>
          {this.props.isSessionStarted &&
            <button className='btn btn-warning' onClick={this.props.onClickSolve}>Insert Solution</button>
          }
        </div>
        <div className='challenge__user-output'>
          <CodeMirror
            options={outputOptions}
            value={this.props.userOutput}
          />
        </div>

        {testResults}

      </div>
    );
  }
}

ChallengePanel.defaultProps = {
  showDescription: true
};

ChallengePanel.propTypes = {
  description: ImmutablePropTypes.list.isRequired,
  title: PropTypes.string.isRequired,
  isSessionStarted: PropTypes.bool.isRequired,
  isSessionFinished: PropTypes.bool.isRequired,
  isTimerFinished: PropTypes.bool.isRequired,
  onClickFinishSession: PropTypes.func.isRequired,
  onClickRunTests: PropTypes.func.isRequired,
  onClickSolve: PropTypes.func.isRequired,
  onClickStartChallenge: PropTypes.func.isRequired,
  userOutput: PropTypes.string.isRequired,
  testResults: ImmutablePropTypes.list.isRequired,
  editor: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  showDescription: PropTypes.bool,
  isRunningTests: PropTypes.bool.isRequired
};
