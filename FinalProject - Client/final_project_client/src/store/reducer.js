import {
  TOGGLE_NAVIGATION,
  CLOSE_NAVIGATION,
  PLAY_VIDEO,
  CLOSE_VIDEO,
  SET_USER,
} from "../actions";

const initialState = {
  isNavOpen: false,
  isVideodPlaying: false,
  userState: {
    user:null
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAVIGATION:
      return {
        isNavOpen: !state.isNavOpen
      };
    case CLOSE_NAVIGATION:
      return {
        isNavOpen: false
      };
    case PLAY_VIDEO:
      return {
        ...state,
        isVideodPlaying: true
      };
    case CLOSE_VIDEO:
      return {
        ...state,
        isVideodPlaying: false
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload.userState,
      };
    default:
      return state;
  }
};

export default reducer;