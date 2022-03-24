import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { userLogin } from '../interfaces/userLogin';
import { userInfo } from '../interfaces/userInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host: string = environment.apiFakeLogin;

  checkStatus = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = this.checkStatus.asObservable();

  errorStatus = new BehaviorSubject<boolean>(false);
  errorLoggedIn = this.errorStatus.asObservable();

  constructor(private http: HttpClient, private jwtHelp: JwtHelperService) {
    localStorage.removeItem('error');
  }
  checkLogin = () => {
    try {
      const token = this.b64_to_utf8(localStorage.getItem('token'));
      if (token && !this.jwtHelp.isTokenExpired(token)) {
        this.checkStatus.next(true);
      } else {
        this.checkStatus.next(false);
      }
    } catch (error) {
      this.checkStatus.next(false);
    }
  };
  loginUser = (user: userLogin, remember: boolean) => {
    return this.http.post(`${this.host}/login/`, user).subscribe(
      (infoLogin: any) => {
        if (infoLogin) {
          if (remember) {
            localStorage.setItem(
              'remember',
              this.utf8_to_b64(JSON.stringify(user))
            );
          }
          localStorage.removeItem('error');
          localStorage.setItem(
            'token',
            this.utf8_to_b64(infoLogin.accessToken)
          );

          localStorage.setItem(
            'info',
            this.utf8_to_b64(JSON.stringify(infoLogin.user))
          );
          this.errorStatus.next(false);
          this.checkLogin();
        }
      },
      (error) => {
        this.checkLogin();
        let mensaje = 'Usuario y contraseña incorrecto';
        localStorage.setItem('error', mensaje);
        this.errorStatus.next(true);
        return mensaje;
      }
    );
  };

  eliminarTokensYsession = () => {
    localStorage.clear();
    this.checkLogin();
  };
  getMsjError() {
    return localStorage.getItem('error');
  }

  getRemember = (): userLogin => {
    return localStorage.getItem('remember')
      ? JSON.parse(this.b64_to_utf8(localStorage.getItem('remember')))
      : null;
  };

  getUser = (): userInfo => {
    return localStorage.getItem('info')
      ? JSON.parse(this.b64_to_utf8(localStorage.getItem('info')))
      : null;
  };

  //encriptar valores
  utf8_to_b64 = (str: string): string => {
    return window.btoa(unescape(encodeURIComponent(str)));
  };

  //des encriptar valores
  b64_to_utf8 = (str: string): string => {
    return decodeURIComponent(escape(window.atob(str)));
  };
}
