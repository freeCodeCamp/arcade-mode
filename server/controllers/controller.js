
let offline = false;
if (process.env.ARCADE_MODE_OFFLINE) {
  offline = true;
}

function controller () {
  this.getIndex = (req, res) => {
    res.render('index', { offline });
  };
}

module.exports = controller;
