import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Google2fa as IGoogle2fa } from '../../../models/interfaces/google2fa.interface';

import { AuthRepository } from '../../../repositories/auth/auth.repository';

@Component({
  selector: 'app-google2fa',
  templateUrl: './google2fa-qr.component.html',
  styleUrls: ['./google2fa-qr.component.scss']
})
export class Google2faQrComponent implements OnInit {
  google2fa: IGoogle2fa | {};

  constructor(
    private authRepository: AuthRepository
  ) { }

  ngOnInit(): void {
    this.authRepository.google2faQr().subscribe(res => {
      if (!res) {
        return;
      }

      this.google2fa = res;
    });
  }
}
