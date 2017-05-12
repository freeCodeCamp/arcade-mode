
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import App from './containers/App';

const store = configureStore();
const app = document.querySelector('.app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, app
);

