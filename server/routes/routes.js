const Controller = require('../controllers/controller');

module.exports = app => {
  const controller = new Controller();

  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  });

  app.route('/')
    .get(controller.getIndex);

  app.use((req, res) => {
    res.status(400).send('Bad request.');
  });
};
