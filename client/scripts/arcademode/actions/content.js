
'use strict';

import Persist from '../persistdata';

const CONTENT_SAVED = 'CONTENT_SAVED';
const CONTENT_LOADED = 'CONTENT_LOADED';
const persist = new Persist('content');

// import a list of the content paths to save and pass to saveContent

export function saveContent (content) {
  return dispatch => {
    persist.toStorage().then(() => {
      dispatch(actionSaveContent());
    });
  };
}

// load content where? Is this even needed? If we have the user load everything from IDB,
// and then fallback to network?
export function loadContent () {
  return dispatch => {
    persist.fromStorage().then(content => {
      dispatch(actionLoadContent(content));
    });
  };
}

export function actionSaveContent () {
  return {
    type: CONTENT_SAVED
  };
}

export function actionLoadContent (content) {
  return {
    type: CONTENT_LOADED,
    content
  };
}

