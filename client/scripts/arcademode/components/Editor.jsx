
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';

const editorOptions = {
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: true,
  // mode: 'javascript',
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

export default class Editor extends React.Component {
  processEditorOption() {
    let classname;
    if (this.props.editor === 'Normal') {
      editorOptions.mode = 'javascript';
      classname = 'CodeMirror';
    }
    else {
      editorOptions.mode = '';
      classname = 'CodeMirror--whiteboard';
    }
    return { editorOptions, classname };
  }

  render() {
    const editorState = this.processEditorOption();
    return (
      <div className={this.props.classN}>
        <CodeMirror
          className={editorState.classname}
          onChange={this.props.onCodeChange}
          options={editorState.editorOptions}
          value={this.props.code}
        />
      </div>
    );
  }
}

Editor.defaultProps = {
  code: ''
};

Editor.propTypes = {
  classN: PropTypes.string.isRequired,
  editor: PropTypes.string.isRequired,
  code: PropTypes.string,
  onCodeChange: PropTypes.func.isRequired

};
