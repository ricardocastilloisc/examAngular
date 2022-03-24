import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { userLoginInterface } from '../interfaces/loginInterfaces/userLogin.interface';
import { userInfoInterface } from '../interfaces/loginInterfaces/userInfo.interface';
import { userFormInterface } from '../interfaces/loginInterfaces/userFormRegister.interface';
import { responseLoginInterface } from '../interfaces/loginInterfaces/responseLogin.interface';

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
  loginUser = (user: userLoginInterface, remember: boolean) => {
    return this.http.post(`${this.host}/login/`, user).subscribe(
      (infoLogin: responseLoginInterface) => {
        if (infoLogin) {
          if (remember) {
            localStorage.setItem(
              'remember',
              this.utf8_to_b64(JSON.stringify(user))
            );
          }
          localStorage.removeItem('error');
          this.setLocalStorageInfoLogin(infoLogin);
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

  registerUser = (user: userFormInterface): Promise<responseLoginInterface> => {
    const { email, name, lastname, password } = user;
    return this.http
      .post(`${this.host}/users/register`, {
        email,
        name,
        lastname,
        password,
      })
      .pipe(
        map((responseApiLogin: responseLoginInterface) => {
          this.setLocalStorageInfoLogin(responseApiLogin);
          return responseApiLogin;
        })
      )
      .toPromise();
  };

  setLocalStorageInfoLogin = (responseApiLogin: responseLoginInterface) => {
    localStorage.setItem(
      'token',
      this.utf8_to_b64(responseApiLogin.accessToken)
    );

    localStorage.setItem(
      'info',
      this.utf8_to_b64(JSON.stringify(responseApiLogin.user))
    );
  };

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('info');
    this.checkLogin();
    return;
  }

  getMsjError() {
    return localStorage.getItem('error');
  }

  getRemember = (): userLoginInterface => {
    return localStorage.getItem('remember')
      ? JSON.parse(this.b64_to_utf8(localStorage.getItem('remember')))
      : null;
  };

  getUser = (): userInfoInterface => {
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
