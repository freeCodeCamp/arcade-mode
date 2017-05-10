

import { expect } from 'chai';
import sinon from 'sinon';

import Timer from '../client/scripts/arcademode/model/Timer';

describe('Timer', () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it('description', () => {
    const timer = new Timer(100);
    expect(timer.isFinished()).to.be.false;
    clock.tick(110);
    expect(timer.isFinished()).to.be.true;
  });
});

