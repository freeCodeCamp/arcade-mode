
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
    while (pw--) {
      let ph = $.height;
      while (ph--) {
        $.ctx.fillStyle = `hsla(${$.hue - pw}, 100%, 90%, 0.5)`;
        $.ctx.fillRect(pw, ph, 1, 1);
      }
    }
  };

  $.loop = () => {
    requestAnimationFrame($.loop);
    $.step();
    $.draw();
  };

  $.init();
});
