
/* eslint no-undef: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CodeMirror from 'react-codemirror';

import ChallengeDescription from './ChallengeDescription';
import TestResults from './TestResults';
import BenchmarkResults from './BenchmarkResults';
// import MathJax from '../../vendor/MathJax'; // single-file ver. doesn't work as it uses code incompatible with strict mode i.e., arguments.callee
// importing MathJax from npm's mathjax also doesn't seem to work (mathjax not found).
// Hence, the current solution is to rely on the external script. This however means potential problems during offline sessions.

const outputOptions = {
  readOnly: true,
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: false,
  mode: '',
  json: true
};

/* Component which renders the left panel containing control buttons, test
 * description and test results.*/
export default class ChallengePanel extends React.Component {
  constructor(props) {
    super(props);
    MathJax.Hub.Config({
      tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
    });
  }

  componentDidMount () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.querySelector('.challenge__description')]);
  }

  componentDidUpdate () {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.querySelector('.challenge__description')]);
  }

  getOverallTestResult () {
    if (this.props.testResults.size) {
      return this.props.testResults.every(test => test.pass);
    }
    return false;
  }

  render() {
    /*
    let finishButton = null;
    if (this.props.isTimerFinished && !this.props.isSessionFinished) {
      finishButton = (
        <button className='btn btn-danger btn-big btn-block' onClick={this.props.onClickFinishSession}>Finish</button>
      );
    }
   */

    const overallTestResult = this.getOverallTestResult();
    const runTestsBtnClass = (this.props.isRunningTests || this.props.isRunningBenchmark) ? 'btn btn-primary btn-big btn-block disabled' : 'btn btn-primary btn-big btn-block';
    const runBenchmarkBtnClass = (this.props.isRunningTests || this.props.isRunningBenchmark) ? 'btn btn-info btn-big btn-block disabled' : 'btn btn-info btn-big btn-block';

    /* eslint react/no-danger: 0 */
    return (
      <div className='challenge-panel'>
        <div className='challenge__title'>{this.props.title}</div>
        <ChallengeDescription
          description={this.props.description}
          showDescription={this.props.showDescription}
        />
        <div className='challenge__buttons'>
          {!this.props.isSessionStarted &&
            <button className='btn btn-success btn-big btn-block' onClick={this.props.onClickStartChallenge}>Start</button>
          }
        </div>
        {/*
        <div className='challenge__buttons'>
          {(!this.props.isSessionStarted || this.props.mode === 'Practice') &&
            <button className='btn btn-primary btn-big btn-block' onClick={this.props.onModalOpen}>Menu</button>
          }
        </div>
       */}
        <div className='challenge__buttons'>
          {this.props.isSessionStarted &&
            <button className={runTestsBtnClass} onClick={this.props.onClickRunTests}>Run tests</button>
          }
        </div>
        <div className='challenge__buttons'>
          {this.props.isSessionStarted &&
            overallTestResult &&
            this.props.benchmark !== '' &&
            !/^\/\//.test(this.props.benchmark) && // if commented out, ignore
            <button className={runBenchmarkBtnClass} onClick={this.props.onClickBenchmark}>Benchmark</button>
          }

          {/* {finishButton} */}
        </div>
        { this.props.isSessionStarted &&
          <div className='challenge__buttons'>
            <button className='btn btn-primary btn-big btn-block' onClick={this.props.onClickResetCode}>Reset your code</button>
          </div>
        }
        {/*
        <div className='challenge__buttons'>

          <button
            className='btn btn-default btn-big btn-block'
            onClick={this.props.onClickShowHideProfile}
          >
            {this.props.isProfileShown &&
            'Hide Profile'
            }
            {!this.props.isProfileShown &&
            'Show Profile'
            }
          </button>
        </div>
       */}
        { this.props.isSessionStarted &&
          <div className='challenge__buttons'>
            <button className='btn btn-primary btn-big btn-block' onClick={this.props.onClickSkip}>Skip this challenge</button>
          </div>
        }
        <div className='challenge__buttons'>
          { this.props.appConfig.toJS().whiteboard &&
            <input
              className='btn btn-default btn-big btn-block'
              type='button'
              onClick={this.props.onChangeEditor}
              value={this.props.editor === 'Normal' ? 'Whiteboard' : 'Normal'}
            />
          }
        </div>
        <div className='challenge__buttons'>
          { this.props.appConfig.toJS().insertSolution &&
            this.props.isSessionStarted &&
            <button className='btn btn-warning btn-big btn-block' onClick={this.props.onClickSolve}>Insert Solution</button>
          }
        </div>
        <div className='challenge__user-output'>
          <CodeMirror
            options={outputOptions}
            value={this.props.userOutput}
          />
        </div>
        {/* {benchmarkResults} */}
        {/* {testResults} */}
        <BenchmarkResults
          benchmarkResults={this.props.benchmarkResults}
        />
        <TestResults
          testResults={this.props.testResults}
          editor={this.props.editor}
        />
      </div>
    );
  }
}

ChallengePanel.defaultProps = {
  showDescription: true,
  benchmark: ''
};

ChallengePanel.propTypes = {
  appConfig: ImmutablePropTypes.map.isRequired,
  title: PropTypes.string.isRequired,
  description: ImmutablePropTypes.list.isRequired,
  benchmark: PropTypes.string,
  isSessionStarted: PropTypes.bool.isRequired,
//  isSessionFinished: PropTypes.bool.isRequired,
//  isTimerFinished: PropTypes.bool.isRequired,
//  onClickFinishSession: PropTypes.func.isRequired,
  onClickRunTests: PropTypes.func.isRequired,
  onClickResetCode: PropTypes.func.isRequired,
//  onClickShowHideProfile: PropTypes.func.isRequired,
//  isProfileShown: PropTypes.bool.isRequired,
  onChangeEditor: PropTypes.func.isRequired,
  onClickSkip: PropTypes.func.isRequired,
  onClickSolve: PropTypes.func.isRequired,
  onClickBenchmark: PropTypes.func.isRequired,
  onClickStartChallenge: PropTypes.func.isRequired,
  userOutput: PropTypes.string.isRequired,
  benchmarkResults: ImmutablePropTypes.map.isRequired,
  testResults: ImmutablePropTypes.list.isRequired,
  editor: PropTypes.string.isRequired,
//  onModalOpen: PropTypes.func.isRequired,
//  mode: PropTypes.string.isRequired,
  showDescription: PropTypes.bool,
  isRunningBenchmark: PropTypes.bool.isRequired,
  isRunningTests: PropTypes.bool.isRequired
};
