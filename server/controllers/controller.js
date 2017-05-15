function controller () {
  this.getIndex = (req, res) => {
    if (!req.secure) {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    res.render('index');
  };
}

module.exports = controller;
