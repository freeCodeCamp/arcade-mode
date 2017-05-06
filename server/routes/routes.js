'use strict';

const Controller = require('../controllers/controller');

module.exports = (app) => {

  const controller = new Controller();

  app.route('/')
    .get(controller.getIndex);

  app.use((req, res) => {
    res.status(400).send('Bad request.');
  });


};
