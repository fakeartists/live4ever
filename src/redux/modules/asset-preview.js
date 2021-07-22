import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'assetPreviewState';

// Reducer
export default function reducer(state = false, action) {
  switch (action.type) {
    case keys.ASSET_PREVIEW_STATE:
      return action.isOpen;
    default:
      return state;
  }
}

// Action Creators
export function setAssetPreviewState(isOpen) {
  return {
    type: keys.ASSET_PREVIEW_STATE,
    isOpen
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
