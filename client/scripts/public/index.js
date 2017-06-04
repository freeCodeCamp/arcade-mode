
'use strict';

import titleCanvas from './modules/titleCanvas';
import swRegistration from './modules/swRegistration';

/*
document.addEventListener('DOMContentLoaded', () => {
  titleCanvas().init();
});
*/

window.onload = () => {
  titleCanvas().init();

  swRegistration();
};

