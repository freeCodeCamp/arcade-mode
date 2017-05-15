function controller () {
  this.getIndex = (req, res) => {
    // if (req.protocol 
    console.log(req.protocol);
    if (req.protocol === 'http') {
      res.protocol = 'https';
      res.render('index');
    }
    res.render('index');
  };
}

module.exports = controller;
