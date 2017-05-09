
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutable';

import App from './containers/App';
import arcadeReducer from './reducers/ArcadeReducer';
import composeEnhancers from './reducers/composeEnhancers';

const ReactRedux = require('react-redux');

const Provider = ReactRedux.Provider;

const app = document.querySelector('.app');

const reducersCombined = combineReducers({
  arcadeReducer
});

const mainStore = createStore(reducersCombined, composeEnhancers());

ReactDOM.render(
  <Provider store={mainStore}>
    <App />
  </Provider>, app
);

