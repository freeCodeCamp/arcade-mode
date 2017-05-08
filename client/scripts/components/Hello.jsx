import React from 'react';

import Header from './Header';

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>This is the Hello component</h1>
        <span>More text to update browserify-inc to see it in action</span>
      </div>
    );
  }
}
