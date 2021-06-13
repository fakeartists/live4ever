import { createSelector } from 'reselect';

const selectWindowSize = state => state.windowSize;
const selectRouting = state => state.routing.location;

// Window Size
export const selectWindowWidth = createSelector(
  selectWindowSize,
  windowSize => windowSize.width
);
export const selectWindowHeight = createSelector(
  selectWindowSize,
  windowSize => windowSize.height
);

// Routing
export const selectPath = createSelector(
  selectRouting,
  location => location.pathname
);

// Locale
export const selectCopy = state => {
  return state.locale.copy;
};
