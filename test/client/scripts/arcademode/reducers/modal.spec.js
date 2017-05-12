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
import reducer from '../../../../../client/scripts/arcademode/reducers/modal';

import { onModalClose } from '../../../../../client/scripts/arcademode/actions/modal';

const dummyAction = { type: 'DUMMY' };

describe('modal reducer', () => {
  it('should do close modal upon MODAL_CLOSE', () => {
    const state = reducer(undefined, dummyAction);
    assert(state.modal === true, 'Modal is open OK');
    const nextState = reducer(state, onModalClose());
    assert(nextState.modal === false, 'Modal is closed OK');
  });
});

