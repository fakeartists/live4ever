import keys from '../keys';
import reducerRegistry from '../reducer-registry';

const reducerName = 'loginState';

// Reducer
export default function reducer(state = false, action) {
  switch (action.type) {
    case keys.LOGIN_STATE:
      return action.isOpen;
    default:
      return state;
  }
}

// Action Creators
export function setLoginState(isOpen) {
  return {
    type: keys.LOGIN_STATE,
    isOpen
  };
}

// Register Reducers
reducerRegistry.register(reducerName, reducer);
