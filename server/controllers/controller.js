function controller () {
  this.getIndex = (req, res) => {
    // if (req.protocol 
    console.log(req.protocol);
    if (req.protocol === 'http') {
      res.redirect('https://arcademode.herokuapp.com');
    }
    res.render('index');
  };
}

module.exports = controller;
