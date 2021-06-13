import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'galleryLoaded';

// Reducer
export default function reducer(state = false, action) {
  switch (action.type) {
    case keys.GALLERY_LOADED:
      return action.loaded;
    default:
      return state;
  }
}

// Action Creators
export function setGalleryLoaded(loaded) {
  return {
    type: keys.GALLERY_LOADED,
    loaded
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
