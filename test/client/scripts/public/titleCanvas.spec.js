
'use strict';

import { expect } from 'chai';

import titleCanvas from '../../../../client/scripts/public/modules/titleCanvas';

describe('ARCADE MODE Canvas animation', () => {
  const canvasObject = titleCanvas();

  before(() => {
    document.body.innerHTML =
'<a href="//freecodecamp.github.io/arcade-mode" class="am__am__link"><div class="am__am__logo"><canvas class="am__am__canvas" height="50" width="220">ARCADE MODE</canvas><svg class="am__am__svg"><clipPath id="arcadePath"><text class="am__am__canvas__text" x="0" y="35">ARCADE MODE</text></clipPath></svg></div></a>';

    canvasObject.init();
  });

  after(() => {
    document.body.removeChild(document.querySelector('.am__am__link'));
  });

  it('should render', () => {
    const canvasEl = document.querySelector('.am__am__canvas');
    expect(canvasEl.height).to.equal(50);
    expect(canvasEl.width).to.equal(125);
    expect(canvasObject.hue).to.be.within(0, 360);
  });
});
