
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class CanvasText extends React.Component {
  constructor(props) {
    super(props);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    this.canvas.width = 220;
    this.canvas.height = 50;
    this.ctx = this.canvas.getContext('2d');

    requestAnimationFrame(this.renderCanvas);
  }

  componentDidUpdate() {
    requestAnimationFrame(this.renderCanvas);
  }

  renderCanvas() {
    // let sw = this.canvas.width;
    this.ctx.fillStyle = `hsla(${this.props.hue}, 100%, 90%, 0.5)`;
    this.ctx.fillRect(0, 0, 220, 50);
    this.props.updateCanvas(this.props.hue);
    /*
    while (sw--) {
      this.ctx.fillStyle = `hsla(${this.props.hue - sw}, 100%, 90%, 0.5)`;
      this.ctx.fillRect(sw, 0, 1, 50);
    }
    */
  }

  render() {
    return (
      <div className='am__am__logo'>
        <canvas ref={canvas => { this.canvas = canvas; }} className='am__am__canvas' height='50' width='220'>ARCADE MODE</canvas>
        <svg className='am__am__svg'>
          <clipPath id='arcadePath'>
            <text className='am__am__canvas__text' x='0' y='35'>ARCADE MODE</text>
          </clipPath>
        </svg>
      </div>
    );
  }
}

CanvasText.propTypes = {
  hue: PropTypes.number.isRequired,
  updateCanvas: PropTypes.func.isRequired
};
