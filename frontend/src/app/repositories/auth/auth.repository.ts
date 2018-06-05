import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app-state.interface';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../requests/login.request';
import { AuthActions } from '../../states/auth/auth.actions';
import { Auth } from '../../models/auth';
import { Auth as IAuth } from '../../models/interfaces/auth.interface';
import { RegisterRequest } from '../../requests/register.request';
import { User } from '../../models/user';
import { User as IUser } from '../../models/interfaces/user.interface';
import { Repository } from '../repository.abstract';
import { NotificationActions } from '../../states/notification/notification.actions';
import { ForgotPassword as IForgotPassword } from '../../models/interfaces/forgot-password.interface';
import { ForgotPassword } from '../../models/forgot-password';
import { ForgotPasswordRequest } from '../../requests/forgot-password.request';
import { ResetPasswordRequest } from '../../requests/reset-password.request';
import { ResetPassword as IResetpassword, ResetPassword } from '../../models/reset-password';
import { EmailVerificationRequest } from '../../requests/email-verification.request';
import { GoogleLoginResponse } from '../../models/responses/google-login.response';
import { UserResponse } from '../../models/responses/user.response';
import { Google2fa as IGoogle2fa } from '../../models/interfaces/google2fa.interface';
import { Google2fa } from '../../models/google2fa';
import { Google2faRequest } from '../../requests/google2fa.request';

@Injectable()
export class AuthRepository extends Repository {
  private readonly FAILURE_TEXT: string = 'Oeps, er ging iets mis. Probeer het later opnieuw';
  private readonly FORGOT_PASSWORD_SUCCESS: string = 'Er is een e-mail met verdere instructies naar u verstuurd';
  private readonly RESET_PASSWORD_SUCCESS: string = 'Uw wachtwoord is gewijzigd, u wordt nu automatisch ingelogd';
  private readonly GOOGLE_AUTHENTICATOR_SUCCESFULL_SETUP: string = 'Two factor authenticatie is ingesteld';
  private readonly INVALID_2FA_CODE: string = 'Code niet geldig';

  auth$ = this.store.select(s => s.auth);

  constructor(
    protected store: Store<AppState>,
    private authService: AuthService,
    private authActions: AuthActions,
    protected notificationActions: NotificationActions,
  ) {
    super(store, notificationActions);
  }

  login(credentials: LoginRequest): Observable<IAuth> {
    return this.authService.login(credentials.prepareRequest()).pipe(map(res => {
      const auth = Auth.parse(res);
      localStorage.setItem('token', auth.apiToken);
      this.store.dispatch(this.authActions.setAuthentication(auth));
      return auth;
    }), catchError(res => {
      this.setError(res.error);
      return of(undefined);
    }));
  }

  register(data: RegisterRequest): Observable<IUser> {
    return this.authService.register(data.prepareRequest()).pipe(map((res) => {
      const user = User.parse(res);
      this.setInfo('Er is een E-mail verificatie mail naar u verstuurd');
      return user;
    }), catchError(res => {
      this.setError(res.error.message);
      return of(undefined);
    }));
  }

  logout(): Observable<boolean> {
    return this.authService.logout().pipe(map((res) => {
      this.store.dispatch(this.authActions.unsetAuthentication());
      localStorage.removeItem('token');
      return true;
    }), catchError(res => {
      this.setError(this.FAILURE_TEXT);
      return of(undefined);
    }));
  }

  me(): Observable<IAuth> {
    return this.authService.me().pipe(map((res) => {
      const auth = this.userToAuth(res);
      this.store.dispatch(this.authActions.setAuthentication(auth));
      localStorage.setItem('token', auth.apiToken);
      return auth;
    }), catchError(res => {
      this.store.dispatch(this.authActions.unsetAuthentication());
      localStorage.removeItem('token');
      return of(undefined);
    }));
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<IForgotPassword> {
    return this.authService.forgotPassword(data.prepareRequest()).pipe(map((res) => {
      const forgotPassword = ForgotPassword.parse(res);
      this.setInfo(this.FORGOT_PASSWORD_SUCCESS);
      return forgotPassword;
    }), catchError((res) => {
      const forgotPassword = ForgotPassword.parse(res.error);
      this.setError(forgotPassword.message);
      return forgotPassword.success ? of(forgotPassword) : of(undefined);
    }));
  }

  resetPassword(data: ResetPasswordRequest): Observable<IResetpassword> {
    return this.authService.resetPassword(data.prepareRequest()).pipe(map((res) => {
      const resetPassword = ResetPassword.parse(res);
      this.store.dispatch(this.authActions.setAuthentication(resetPassword));
      localStorage.setItem('token', resetPassword.apiToken);
      this.setInfo(this.RESET_PASSWORD_SUCCESS);
      return resetPassword;
    }), catchError(res => {
      const resetPassword = ResetPassword.parse(res.error);
      this.setError(resetPassword.message);
      return resetPassword.success ? of(resetPassword) : of(undefined);
    }));
  }

  emailVerification(data: EmailVerificationRequest): Observable<boolean> {
    return this.authService.emailVerification(data.prepareRequest()).pipe(map((res) => {
      return true;
    }), catchError(res => {
      this.setError(this.FAILURE_TEXT);
      return of(undefined);
    }));
  }

  googleLogin(): Observable<GoogleLoginResponse> {
    return this.authService.googleLogin().pipe(tap((res) => {
      window.location.href = res.url;
    }), catchError(res => {
      this.setError(this.FAILURE_TEXT);
      return of(undefined);
    }));
  }

  googleLoginCallback(code: string): Observable<IAuth> {
    return this.authService.googleLoginCallback(code).pipe(map((res) => {
      const auth = this.userToAuth(res);
      this.store.dispatch(this.authActions.setAuthentication(auth));
      localStorage.setItem('token', auth.apiToken);
      return auth;
    }), catchError(res => {
      this.setError(this.FAILURE_TEXT);
      return of(undefined);
    }));
  }

  google2faQr(): Observable<IGoogle2fa | {}> {
    return this.authService.google2faQr().pipe(map(res => {
      const google2fa = Google2fa.parse(res);
      return google2fa;
    }), catchError(res => {
      this.setError(this.FAILURE_TEXT);
      return of(undefined);
    }));
  }

  google2faCode(data: Google2faRequest): Observable<boolean> {
    return this.authService.google2faCode(data.prepareRequest()).pipe(map(res => {
      return true;
    }), catchError(err => {
      this.setError(this.INVALID_2FA_CODE);
      this.store.dispatch(this.authActions.unsetAuthentication());
      localStorage.removeItem('token');
      return of(undefined);
    }));
  }

  private userToAuth(data: { user: UserResponse }) {
    const auth = {
      user: data.user,
      token: data.user.api_token
    };

    return Auth.parse(auth);
  }
}
