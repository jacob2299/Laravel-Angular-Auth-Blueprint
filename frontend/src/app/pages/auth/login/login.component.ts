import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthRepository } from '../../../repositories/auth/auth.repository';
import { LoginRequest } from '../../../requests/login.request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private authRepository: AuthRepository,
    private router: Router
  ) { }

  ngOnInit() {
    this.setupForms();
  }

  setupForms() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isLoading = true;
    const request = new LoginRequest(this.loginForm.value);

    this.authRepository.login(request).subscribe((auth) => {
      if (!auth) {
        this.isLoading = false;
        return;
      }

      if (auth.user.google2faEnabled) {
        this.router.navigate(['/auth/2fa']);
      } else {
        this.router.navigate(['home']);
      }
      this.isLoading = false;
    });
  }

  gotToRegister() {
    this.router.navigate(['auth/register']);
  }

  googleLogin(event) {
    event.preventDefault();
    this.authRepository.googleLogin().subscribe();
  }
}
