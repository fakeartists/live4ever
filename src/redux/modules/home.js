import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'homeLoaded';

// Reducer
export default function reducer(state = false, action) {
  switch (action.type) {
    case keys.HOME_LOADED:
      return action.loaded;
    default:
      return state;
  }
}

// Action Creators
export function setHomeLoaded(loaded) {
  return {
    type: keys.HOME_LOADED,
    loaded
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
