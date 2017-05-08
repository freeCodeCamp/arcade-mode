loadDotEnv();

const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const compression = require('compression');
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const routes = require('./routes/routes');


const port = process.env.PORT || 8080;
// const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/arcade-mode';
/*
mongoose.Promise = global.promise;
mongoose.connect(mongoURI);
mongoose.connection.on('error', () => {
  console.error('Error: Could not connect to MongoDB. Did you forget to run "mongod"?');
});
*/

const app = express();

app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
app.use(favicon(`${process.cwd()}/public/img/favicon.ico`));
app.use('/public', express.static(`${process.cwd()}/public`));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

/*
app.use(session({
  secret: process.env.SECRET_KEY,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto' }
}));
*/

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
