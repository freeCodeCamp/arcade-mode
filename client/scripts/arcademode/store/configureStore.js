
'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import invariant from 'redux-immutable-state-invariant';

import appReducer from '../reducers';
import composeEnhancers from '../reducers/composeEnhancers';
// import Immutable from 'immutable';


export default function configureStore () {
  return createStore(appReducer, composeEnhancers(applyMiddleware(
    // invariant(),
    thunk
  )));
}
