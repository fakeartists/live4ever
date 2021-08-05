import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'mineState';

const defaultState = {
  data: null,
  isOpen: false,
  onboarding: false
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
    case keys.MINE_STATE_ONBOARDING:
      return {
        ...state,
        onboarding: action.onboarding
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

export function setOnboardingState(onboarding) {
  return {
    type: keys.MINE_STATE_ONBOARDING,
    onboarding
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
