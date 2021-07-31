import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'mineState';

const defaultState = {
  data: null,
  isOpen: false
};

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case keys.MINE_STATE:
      return {
        ...state,
        data: action.data
      };
    case keys.MINE_STATE_LEVEL_UP:
      return {
        ...state,
        isOpen: action.isOpen
      };
    default:
      return state;
  }
}

// Action Creators
export function setMineState(data) {
  return {
    type: keys.MINE_STATE,
    data
  };
}

export function setLevelUpState(isOpen) {
  return {
    type: keys.MINE_STATE_LEVEL_UP,
    isOpen
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
