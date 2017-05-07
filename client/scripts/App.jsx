import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello';

class App extends React.Component {
  render() {
    return (
      <div>
        <Hello />
        <strong>And this is straight from the App itself.</strong>
      </div>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
