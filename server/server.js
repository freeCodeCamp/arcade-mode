'use strict';

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const routes = require('./routes/routes');

const app = express();
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));

routes(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node.js is now listening on port ${port}.`);
});
