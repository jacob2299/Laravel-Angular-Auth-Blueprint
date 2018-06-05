import { Injectable } from '@angular/core';
import { type } from '../utils/util';

@Injectable()
export class AuthActions {
  static SET_AUTHENTICATION = type('SET_AUTHENTICATION');
  static UNSET_AUTHENTICATION = type('UNSET_AUTHENTICATION');

  setAuthentication(payload: any = null) {
    return {
      type: AuthActions.SET_AUTHENTICATION,
      payload: payload
    };
  }

  unsetAuthentication(payload: any = null) {
    return {
      type: AuthActions.UNSET_AUTHENTICATION,
      payload: payload
    };
  }
}
