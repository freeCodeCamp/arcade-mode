// 
// 'use strict';
// 
// import { MODAL_CLOSE } from '../actions/modal';
// 
// // import Immutable from 'immutable';
// 
// const initialState = {
//   modal: true // display initially
// };
// 
// export default function modal(state = initialState, action) {
//   const nextState = Object.assign({}, state);
// 
//   switch (action.type) {
//     case MODAL_CLOSE:
//       nextState.modal = false;
//       break;
//     default:
//       return state;
//   }
// 
//   return nextState;
// }

/* Unit tests for file client/scripts/arcademode/reducers/modal.js. */
import { assert } from 'chai';
import modal from '../../../../..//client/scripts/arcademode/reducers/modal.js'


describe('modal', () => {

  it('should do x', () => {
    assert(/* code */);
  });

});

