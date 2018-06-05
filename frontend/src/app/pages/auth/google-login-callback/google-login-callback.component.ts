import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRepository } from '../../../repositories/auth/auth.repository';

@Component({
  selector: 'app-google-login-callback',
  template: ``
})
export class GoogleLoginCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authRepository: AuthRepository,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.send(params['code']);
    });
  }

  send(code) {
    this.authRepository.googleLoginCallback(code).subscribe((res) => {
      if (!res) {
        return;
      }

      this.router.navigate(['/auth/2fa']);
    });
  }
}
