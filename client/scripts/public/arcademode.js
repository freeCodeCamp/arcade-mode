
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = {};

  $.init = () => {
    $.canvas = document.querySelector('.am__am__canvas');
    $.ctx = $.canvas.getContext('2d');

    $.reset();
    $.loop();
  };

  $.reset = () => {
    $.width = 220;
    $.height = 50;
    $.hue = 0;
  };
  $.step = () => {
    $.hue < 360 ? $.hue++ : $.hue = 0;
  };

  $.draw = () => {
    let pw = $.width;
    const ph = $.height;
    while (pw--) {
      $.ctx.fillStyle = `hsla(${$.hue - pw}, 100%, 90%, 0.5)`;
      $.ctx.fillRect(pw, 0, 1, 50);
    }
  };

  $.loop = () => {
    requestAnimationFrame($.loop);
    $.step();
    $.draw();
  };

  $.init();
});
