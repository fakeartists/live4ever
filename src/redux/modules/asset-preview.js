import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'assetPreviewState';

const defaultState = {
  isOpen: false,
  assetData: null
};

// Reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case keys.ASSET_PREVIEW_STATE:
      return {
        ...state,
        isOpen: action.isOpen
      };
    case keys.ASSET_DATA:
      return {
        ...state,
        assetData: action.assetData
      };
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

export function setAssetData(assetData) {
  return {
    type: keys.ASSET_DATA,
    assetData
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
