import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthRepository } from '../../../repositories/auth/auth.repository';
import { ForgotPasswordRequest } from '../../../requests/forgot-password.request';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private authRepository: AuthRepository
  ) { }

  ngOnInit(): void {
    this.setupForms();
  }

  setupForms() {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
  }

  sendMail() {
    this.isLoading = true;
    const request = new ForgotPasswordRequest(this.form.value);

    this.authRepository.forgotPassword(request).subscribe((forgotPassword) => {
      this.isLoading = false;
      if (!forgotPassword) {
        return;
      }
    });
  }
}
