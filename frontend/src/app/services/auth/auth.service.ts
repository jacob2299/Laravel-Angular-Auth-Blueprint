import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../../requests/login.request';
import { LoginResponse } from '../../models/responses/login.response';
import { RegisterRequest } from '../../requests/register.request';
import { RegisterResponse } from '../../models/responses/register.response';
import { Service } from '../service.abstract';
import { UserResponse } from '../../models/responses/user.response';
import { ForgotPasswordResponse } from '../../models/responses/forgot-password.response';
import { ForgotPasswordRequest } from '../../requests/forgot-password.request';
import { ResetPasswordRequest } from '../../requests/reset-password.request';
import { ResetPasswordResponse } from '../../models/responses/reset-password.response';
import { EmailVerificationRequest } from '../../requests/email-verification.request';
import { GoogleLoginResponse } from '../../models/responses/google-login.response';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { GoogleLoginCallbackResponse } from '../../models/responses/google-login-callback.response';
import { MeResponse } from '../../models/responses/me.response';
import { Google2faQrResponse } from '../../models/responses/google2fa-qr.response';
import { Google2faRequest } from '../../requests/google2fa.request';

@Injectable()
export class AuthService extends Service {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  login(credentails: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, credentails);
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.api}/register`, data);
  }

  logout(): Observable<{}> {
    return this.http.post<{}>(`${this.api}/logout`, {}, { headers: this.prepareAuthHeaders() });
  }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.api}/me`, { headers: this.prepareAuthHeaders() });
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.api}/password/email`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(`${this.api}/password/reset`, data);
  }

  emailVerification(data: EmailVerificationRequest): Observable<{}> {
    return this.http.post<{}>(`${this.api}/email/verification`, data);
  }

  googleLogin(): Observable<GoogleLoginResponse> {
    return this.http.get<GoogleLoginResponse>(`${this.api}/login/google`);
  }

  googleLoginCallback(code: string): Observable<GoogleLoginCallbackResponse> {
    return this.http.get<GoogleLoginCallbackResponse>(`${this.api}/login/google/callback`, { params: this.prepareParams('code', code) });
  }

  google2faQr(): Observable<Google2faQrResponse> {
    return this.http.get<Google2faQrResponse>(`${this.api}/google2fa/qr`, { headers: this.prepareAuthHeaders() });
  }

  google2faCode(data: Google2faRequest): Observable<{}> {
    return this.http.post<{}>(`${this.api}/google2fa`, data, { headers: this.prepareAuthHeaders() });
  }
}
