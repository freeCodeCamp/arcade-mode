
'use strict';

// canvastext actions

export const CANVAS_UPDATE = 'CANVAS_UPDATE';

export function updateCanvas (hue) {
  return {
    type: CANVAS_UPDATE,
    hue
  };
}
