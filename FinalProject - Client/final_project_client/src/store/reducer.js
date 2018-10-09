import { TOGGLE_NAVIGATION, CLOSE_NAVIGATION } from '../actions';

const initialState = {
    isNavOpen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAVIGATION:
      return {
        isNavOpen: !state.isNavOpen,
      };
    case CLOSE_NAVIGATION:
      return {
        isNavOpen: false,
      };
    default:
      return state;
  }
}

export default reducer;