// 'use strict';
//
// function enforceHttps () {
//   const host = 'arcademode.herokuapp.com';
//   if ((host === location.host) && (location.protocol !== 'https:')) {
//     location.protocol = 'https';
//   }
// }
//
// enforceHttps();

/* Unit tests for file client/scripts/public/head.js. */
/*

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';

// import express from 'express';
// import routes from '../../../../server/routes/routes';

import enforceHttps from '../../../../client/scripts/public/head';

// const app = express();

// routes(app);

chai.use(chaiHttp);

describe('Helper scripts: public/head.js', () => {
  it('should redirect http to https', function (done) {
    this.timeout(5000);
    enforceHttps();

    nock('http://arcademode.herokuapp.com')
      .get('/');

    chai.request('http://arcademode.herokuapp.com')
      .get('/')
      .end((err, res) => {
        // console.log(res);
        // expect(res).to.not.redirect;
        setTimeout(function () {
          console.log('hi');
          return expect(res).to.redirect;
          done();
        }, 2000);
      });
  });
});

*/
