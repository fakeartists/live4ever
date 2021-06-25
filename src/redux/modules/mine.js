import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'mineState';

// Reducer
export default function reducer(state = false, action) {
  switch (action.type) {
    case keys.MINE_STATE:
      return action.isOpen;
    default:
      return state;
  }
}

// Action Creators
export function setMineState(isOpen) {
  return {
    type: keys.MINE_STATE,
    isOpen
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
