import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'mineState';

// Reducer
export default function reducer(state = null, action) {
  switch (action.type) {
    case keys.MINE_STATE:
      return action.data;
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

// Register Reducers
reducerRegistry.register(reducerName, reducer);
