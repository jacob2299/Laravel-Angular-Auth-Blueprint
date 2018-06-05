import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRepository } from '../../../repositories/auth/auth.repository';
import { EmailVerificationRequest } from '../../../requests/email-verification.request';

@Component({
  selector: 'app-email-verification',
  template: `
    <div class="email-verification-page justify-content-center">
      <h1 class="display-4">U E-mail is geverifieerd</h1>
      <button class="btn btn-primary mt-3" [routerLink]="['/auth/login']">Terug naar inloggen</button>
    </div>
  `
})
export class EmailVerificationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authRepository: AuthRepository,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.success(params['token'], params['email']);
    });
  }

  success(token: string, email: string) {
    const request = new EmailVerificationRequest({ token: token, email: email });

    this.authRepository.emailVerification(request).subscribe((res) => {
      if (!res) {
        return;
      }
    });
  }
}
