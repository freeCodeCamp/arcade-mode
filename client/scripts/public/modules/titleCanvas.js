export default function titleCanvas () {
  const $ = {};

  $.init = () => {
    $.canvas = document.querySelector('.am__am__canvas');
    $.ctx = $.canvas.getContext('2d');
    $.mouse = {
      over: 0
    };

    document.querySelector('.am__am__link').addEventListener('mouseover', $.mouseover);
    document.querySelector('.am__am__link').addEventListener('mouseout', $.mouseout);

    $.reset();
    $.loop();
  };

  $.reset = () => {
    $.width = 125;
    $.height = 50;
    $.canvas.width = $.width;
    $.canvas.height = $.height;
    $.hue = 0;
  };

  $.step = () => {
    $.hue < 360 ? $.hue++ : $.hue = 0;
  };

  $.draw = () => {
    let pw = $.width;
    while (pw--) {
      if ($.mouse.over) {
        $.ctx.fillStyle = `hsla(${$.hue - pw}, 100%, 85%, 0.5)`;
      }
      else $.ctx.fillStyle = `hsla(${$.hue - pw}, 100%, 90%, 0.5)`;
      $.ctx.fillRect(pw, 0, 1, 50);
    }
  };

  $.loop = () => {
    window.requestAnimationFrame($.loop);
    $.step();
    $.draw();
  };

  $.mouseover = () => {
    $.mouse.over = 1;
  };

  $.mouseout = () => {
    $.mouse.over = 0;
  };

  return $;
}
