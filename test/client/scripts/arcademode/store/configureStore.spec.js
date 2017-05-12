// 
// 'use strict';
// 
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import appReducer from '../reducers';
// import composeEnhancers from '../reducers/composeEnhancers';
// // import Immutable from 'immutable';
// 
// 
// export default function configureStore() {
//   return createStore(appReducer, composeEnhancers(applyMiddleware(
//     thunk
//   )));
// }

/* Unit tests for file client/scripts/arcademode/store/configureStore.js. */
import { assert } from 'chai';
import configureStore from '../../../../..//client/scripts/arcademode/store/configureStore.js'


describe('configureStore', () => {

  it('should do x', () => {
    assert(/* code */);
  });

});

