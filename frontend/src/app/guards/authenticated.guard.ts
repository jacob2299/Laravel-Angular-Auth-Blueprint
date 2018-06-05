import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthActions } from '../states/auth/auth.actions';
import { AppState } from '../states/app-state.interface';
import { AuthRepository } from '../repositories/auth/auth.repository';

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private router: Router,
    private authActions: AuthActions,
    private store: Store<AppState>,
    private authRepository: AuthRepository
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authRepository.auth$.pipe(map((auth) => {
      if (auth.isAuthenticated) {
        return true;
      }

      if (localStorage.getItem('token')) {
        this.authRepository.me().subscribe((res) => {
          if (!res) {
            this.router.navigate(['auth/login']);
            return false;
          }

          this.router.navigate([route.routeConfig.path]);
          return true;
        });
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    }));
  }
}
