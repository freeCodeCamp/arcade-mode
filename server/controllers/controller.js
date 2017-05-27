
function controller () {
  this.getIndex = (req, res) => {
    res.render('index');
  };
}

module.exports = controller;
