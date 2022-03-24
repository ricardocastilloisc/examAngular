import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLoggenIn = false;
  constructor(private route: Router, private apiLogin: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.apiLogin.checkLogin();
    this.apiLogin.isUserLoggedIn.subscribe((val) => (this.isLoggenIn = val));
    const auth = this.isLoggenIn;
    if (!auth) {
      localStorage.removeItem('token');
      this.route.navigate(['/login']);
      return false;
    }
    return true;
  }
}
