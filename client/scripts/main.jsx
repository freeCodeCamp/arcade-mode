

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import App from './containers/App';
import arcadeReducer from './reducers/ArcadeReducer';

const ReactRedux = require('react-redux');

const Provider = ReactRedux.Provider;

const app = document.getElementById('app');

const mainStore = createStore(arcadeReducer);

ReactDOM.render(
  <Provider store={mainStore}>
    <App />
  </Provider>, app
);

