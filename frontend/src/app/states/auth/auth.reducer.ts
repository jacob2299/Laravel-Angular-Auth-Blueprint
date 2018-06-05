import { AuthState } from './auth.state';
import { AuthActions } from './auth.actions';

const initialState: AuthState = {
  user: null,
  api_token: '',
  isAuthenticated: false
};

export function AuthReducer(state: AuthState = initialState, action) {
  switch (action.type) {
    case AuthActions.SET_AUTHENTICATION:
      return {
        user: action.payload.user,
        api_token: action.payload.user.api_token,
        isAuthenticated: true
      };

    case AuthActions.UNSET_AUTHENTICATION:
      return initialState;

    default:
      return state;
  }
}
