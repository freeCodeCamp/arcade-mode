import React from 'react';

import Header from './Header';

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>This is the Hello component</h1>
      </div>
    );
  }
}
