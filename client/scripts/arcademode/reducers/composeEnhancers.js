/* eslint no-underscore-dangle: 0 */

/* This file is required when debugging redux code with Chrome ReduxDevTools.
 */

import { compose } from 'redux';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist,
    // actionsCreators, serialize...
  }) : compose;

export default composeEnhancers;
