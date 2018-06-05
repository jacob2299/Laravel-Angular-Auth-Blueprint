import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidator } from '../../../validators/password.validator';
import { AuthRepository } from '../../../repositories/auth/auth.repository';
import { ResetPasswordRequest } from '../../../requests/reset-password.request';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  email: string;
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authRepository: AuthRepository,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
      this.setupForms(this.token, this.email);
    });
  }

  setupForms(token, email) {
    this.form = this.fb.group({
      token: [token, Validators.required],
      email: [email, Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    }, {
        validator: PasswordValidator.MatchPassword
      });
  }

  save() {
    this.isLoading = true;

    const request = new ResetPasswordRequest(this.form.value);

    this.authRepository.resetPassword(request).subscribe((res) => {
      this.isLoading = false;
      if (!res) {
        return;
      }

      this.router.navigate(['home']);
    });
  }
}
