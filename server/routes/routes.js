const Controller = require('../controllers/controller');

module.exports = app => {
  const controller = new Controller();

  app.use((req, res, next) => {
    // if (process.env.NODE_ENV === 'production' && !req.secure) {
    
    if (req.get('X-Forwarded-Proto') !== 'https' && req.get('X-Forwarded-Port') !== '443'
        && req.hostname !== 'localhost') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    next();
  });

  app.route('/')
    .get(controller.getIndex);

  app.use((req, res) => {
    res.status(400).send('Bad request.');
  });
};
