'use strict';

function enforceHttps () {
  const host = 'arcademode.herokuapp.com';
  if ((host === location.host) && (location.protocol !== 'https:')) {
    location.protocol = 'https';
  }
}

enforceHttps();
