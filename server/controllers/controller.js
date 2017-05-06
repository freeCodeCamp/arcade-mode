'use strict';

function controller () {
  this.getIndex = (req, res) => {
    res.send('Hello world!');
  }
}

module.exports = controller;
