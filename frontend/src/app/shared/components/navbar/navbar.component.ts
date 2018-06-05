import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthRepository } from '../../../repositories/auth/auth.repository';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authRepository: AuthRepository,
    private router: Router
  ) { }

  ngOnInit(): void { }

  logout() {
    this.authRepository.logout().subscribe((res) => {
      if (!res) {
        return;
      }

      this.router.navigate(['auth/login']);
    });
  }
}
