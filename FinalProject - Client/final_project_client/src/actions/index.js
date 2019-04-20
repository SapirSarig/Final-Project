import LocalStorageUtil from "../utils/LocalStorageUtil";
import SessionStorageUtil from "../utils/SessionStorageUtil";

// Action types
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const CLOSE_NAVIGATION = 'CLOSE_NAVIGATION';
export const PLAY_VIDEO = 'PLAY_VIDEO';
export const CLOSE_VIDEO = 'CLOSE_VIDEO';
export const LOGOUT_USER = 'LOGOUT_USER';


// action creators
export function toggleNav() {
  return { type: TOGGLE_NAVIGATION };
}

export function closeNav() {
  return { type: CLOSE_NAVIGATION };
}

export function playMainVideo() {
  return { type: PLAY_VIDEO };
}

export function closeMainVideo() {
  return { type: CLOSE_VIDEO };
}

export function logout() {  
  LocalStorageUtil.RemoveLoggedUser();
  SessionStorageUtil.RemoveLoggedUser();
  return { type: LOGOUT_USER };
}