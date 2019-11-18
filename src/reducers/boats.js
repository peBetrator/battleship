import {
  CHANGE_DIRECTION_SUCCESS,
  DRAG_SHIP_START,
  DROP_SHIP_SUCCESS,
  MOVE_SHIP_START,
} from '../actions';
import { GRID_SIZE, SHIPS } from '../components/shared';

const countBoats = (boats, boatSize, count) => {
  return boats.map(({ size, qty, ...rest }) =>
    boatSize === size
      ? { ...rest, size, qty: count + qty }
      : { ...rest, size, qty }
  );
};

const changeBoatDirection = (boats, boatSize) => {
  return boats.map(({ size, horizontally, ...rest }) =>
    boatSize === size
      ? { ...rest, size, horizontally: !horizontally }
      : { ...rest, size, horizontally }
  );
};

const getHorizont = (boats, boatSize) => {
  let horizont;
  boats.forEach(({ size, horizontally }) => {
    if (size === boatSize) {
      horizont = horizontally;
    }
  });
  return horizont;
};

const initBattlefield = () => {
  return new Array(GRID_SIZE).fill(0).map(el => new Array(GRID_SIZE).fill(0));
};

const adjustBattlefield = (oldObject, x, y) => {
  const { battlefield, boats, boatSize } = oldObject;
  const horizont = getHorizont(boats, boatSize);

  const populateCells = (x, y) => {
    let size = boatSize;
    while (size) {
      size--;
      if (horizont) battlefield[x][y + size] = boatSize;
      else battlefield[x + size][y] = boatSize;
    }
  };

  for (let i = 0; i < GRID_SIZE; i++)
    for (let j = 0; j < GRID_SIZE; j++) {
      if (i === x && j === y) populateCells(i, j);
    }

  return battlefield;
};

const boatDocked = (oldObject, x, y) => {
  const { boats, boatSize } = oldObject;
  const boatsLeft = countBoats(boats, boatSize, -1);
  const battlefield = adjustBattlefield(oldObject, x, y);

  return {
    ...oldObject,
    boats: boatsLeft,
    coords: [x, y],
    battlefield,
  };
};

const boatSailed = ({ coords, ...oldObject }, x, y) => {
  if (coords[0] === x && coords[1] === y) return { ...oldObject, coords };
  const { boatSize, boatLayed, boats, battlefield } = oldObject;
  // const horizont = getHorizont(boats, boatSize);
  const boatsLeft = countBoats(boats, boatSize, 1);

  let size = boatSize;
  while (size) {
    size--;
    if (boatLayed) battlefield[x][y + size] = 0;
    else battlefield[x + size][y] = 0;
  }

  return {
    ...oldObject,
    boats: boatsLeft,
    coords: [x, y],
    battlefield,
  };
};

const boatTurned = (oldObject, size) => {
  const turned = changeBoatDirection(oldObject.boats, size);

  return {
    ...oldObject,
    boatSize: size,
    boats: turned,
  };
};

export default (
  state = {
    boatSize: 0,
    boatLayed: true,
    boats: SHIPS,
    coords: [],
    battlefield: initBattlefield(),
  },
  action
) => {
  switch (action.type) {
    case DRAG_SHIP_START:
      return { ...state, boatSize: action.size, boatLayed: action.layed };
    case MOVE_SHIP_START:
      return boatSailed(state, action.x, action.y);
    case DROP_SHIP_SUCCESS:
      return boatDocked(state, action.x, action.y);
    case CHANGE_DIRECTION_SUCCESS:
      return boatTurned(state, action.size);

    default:
      return state;
  }
};
