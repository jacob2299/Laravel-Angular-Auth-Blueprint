import { Injectable } from '@angular/core';
import { type } from '../utils/util';

@Injectable()
export class NotificationActions {
  static SET_INFO = type('SET_INFO');
  static SET_WARNING = type('SET_WARNING');
  static SET_SUCCESS = type('SET_SUCCESS');
  static SET_ERROR = type('SET_ERROR');
  static CLEAR_INFO = type('CLEAR_INFO');
  static CLEAR_WARNING = type('CLEAR_WARNING');
  static CLEAR_SUCCESS = type('CLEAR_SUCCESS');
  static CLEAR_ERROR = type('CLEAR_ERROR');

  setInfo(payload: any = null) {
    return {
      type: NotificationActions.SET_INFO,
      payload: payload
    };
  }

  setWarning(payload: any = null) {
    return {
      type: NotificationActions.SET_WARNING,
      payload: payload
    };
  }

  setSuccess(payload: any = null) {
    return {
      type: NotificationActions.SET_SUCCESS,
      payload: payload
    };
  }

  setError(payload: any = null) {
    return {
      type: NotificationActions.SET_ERROR,
      payload: payload
    };
  }

  clearInfo() {
    return {
      type: NotificationActions.CLEAR_INFO
    };
  }

  clearWarning() {
    return {
      type: NotificationActions.CLEAR_WARNING
    };
  }

  clearSuccess() {
    return {
      type: NotificationActions.CLEAR_SUCCESS
    };
  }

  clearError() {
    return {
      type: NotificationActions.CLEAR_ERROR
    };
  }
}
