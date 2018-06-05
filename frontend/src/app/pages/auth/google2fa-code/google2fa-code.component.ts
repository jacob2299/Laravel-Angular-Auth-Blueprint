import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRepository } from '../../../repositories/auth/auth.repository';
import { Router } from '@angular/router';
import { Google2faRequest } from '../../../requests/google2fa.request';

@Component({
  selector: 'app-google2fa-code',
  templateUrl: './google2fa-code.component.html',
  styleUrls: ['./google2fa-code.component.scss']
})
export class Google2faCodeComponent implements OnInit {
  form: FormGroup;
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
    this.form = this.fb.group({
      code: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
  }

  submit() {
    this.isLoading = true;
    const request = new Google2faRequest(this.form.value);

    this.authRepository.google2faCode(request).subscribe(res => {
      this.isLoading = false;
      if (!res) {
        this.router.navigate(['/auth/login']);
        return;
      }

      this.router.navigate(['home']);
    });
  }
}
