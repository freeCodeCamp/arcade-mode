
function controller () {
  this.getIndex = (req, res) => {
    // res.set('Cache-Control', 'max-age=5');
    res.render('index');
  };
}

module.exports = controller;

//Interested in full stackserver deployment on heroku
