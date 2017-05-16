
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';

const editorOptions = {
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: true,
  mode: 'javascript',
  matchBrackets: true,
  autoCloseBrackets: true
  /*
  lineNumbers: true, // seems to break the css/dimensions
  lint: { esversion: 6 },
  runnable: true,
  gutters: ['CodeMirror-lint-markers']
  inputStyle: 'contenteditable'
  */
};

const Editor = props => (
  <div className={'editor'}>
    <CodeMirror
      onChange={props.onCodeChange}
      options={editorOptions}
      value={props.code}
    />
  </div>
);

Editor.defaultProps = {
  code: ''
};

Editor.propTypes = {
  code: PropTypes.string,
  onCodeChange: PropTypes.func.isRequired

};

export default Editor;
