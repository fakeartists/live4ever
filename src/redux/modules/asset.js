import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'assetLoaded';

// Reducer
export default function reducer(state = false, action) {
  switch (action.type) {
    case keys.ASSET_LOADED:
      return action.loaded;
    default:
      return state;
  }
}

// Action Creators
export function setAssetLoaded(loaded) {
  return {
    type: keys.ASSET_LOADED,
    loaded
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
