import { NotificationState } from './notification.state';
import { NotificationActions } from './notification.actions';

const initialState: NotificationState = {
  info: undefined,
  warning: undefined,
  success: undefined,
  error: undefined
};

export function NotificationReducer(state: NotificationState = initialState, action) {
  switch (action.type) {
    case NotificationActions.SET_INFO:
      return {
        info: action.payload
      };
    case NotificationActions.SET_WARNING:
      return {
        warning: action.payload
      };
    case NotificationActions.SET_SUCCESS:
      return {
        success: action.payload
      };
    case NotificationActions.SET_ERROR:
      return {
        error: action.payload
      };
    case NotificationActions.CLEAR_INFO:
      return {
        info: undefined
      };
    case NotificationActions.CLEAR_WARNING:
      return {
        warning: undefined
      };
    case NotificationActions.CLEAR_SUCCESS:
      return {
        success: undefined
      };
    case NotificationActions.CLEAR_ERROR:
      return {
        error: undefined
      };
    default:
      return state;
  }
}
