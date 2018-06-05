import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PasswordValidator } from '../../../validators/password.validator';
import { AuthRepository } from '../../../repositories/auth/auth.repository';
import { RegisterRequest } from '../../../requests/register.request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private authRepository: AuthRepository,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setupForms();
  }

  setupForms() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    }, {
        validator: PasswordValidator.MatchPassword
      });
  }

  register() {
    this.isLoading = true;
    const request = new RegisterRequest(this.registerForm.value);

    this.authRepository.register(request).subscribe((user) => {
      if (!user) {
        this.isLoading = false;
        return;
      }

      this.router.navigate(['auth/login']);
      this.isLoading = false;
    });
  }
}
