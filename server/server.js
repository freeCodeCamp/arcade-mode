'use strict';

loadDotEnv();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const routes = require('./routes/routes');

const port = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
app.use(favicon(`${process.cwd()}/public/img/favicon.ico`));
app.use('/public', express.static(`${process.cwd()}/public`));

app.set('view engine', 'pug');
app.set('views', `${process.cwd()}/server/views`);
app.locals.basedir = app.get('views'); // allows for pug includes

routes(app);

app.listen(port, () => {
  console.log(`Node.js is now listening on port ${port}.`);
});


// helpers
// -------

function loadDotEnv () {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
  }
}
