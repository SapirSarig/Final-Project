// Action types
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const CLOSE_NAVIGATION = 'CLOSE_NAVIGATION';

// action creators
export function toggleNav() {
  return { type: TOGGLE_NAVIGATION };
}

export function closeNav() {
  return { type: CLOSE_NAVIGATION };
}
