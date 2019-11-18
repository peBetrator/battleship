export const DRAG_SHIP_START = 'DRAG_SHIP_START';
export const MOVE_SHIP_START = 'MOVE_SHIP_START';

export const CHANGE_DIRECTION_SUCCESS = 'CHANGE_DIRECTION_SUCCESS';

export const DROP_SHIP_SUCCESS = 'DROP_SHIP_SUCCESS';

export const changeShipDirection = size => dispatch => {
  dispatch({ type: CHANGE_DIRECTION_SUCCESS, size });
};

export const dragShipStart = (size, layed) => dispatch => {
  dispatch({ type: DRAG_SHIP_START, size, layed });
};

export const dropShip = ([x, y]) => dispatch => {
  dispatch({ type: DROP_SHIP_SUCCESS, x, y });
};

export const moveShipStart = ([x, y]) => dispatch => {
  dispatch({ type: MOVE_SHIP_START, x, y });
};
