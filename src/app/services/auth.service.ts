import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host: string = environment.apiFakeLogin;

  checkStatus = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = this.checkStatus.asObservable();

  errorStatus = new BehaviorSubject<boolean>(false);
  errorLoggedIn = this.errorStatus.asObservable();

  constructor(private http: HttpClient) {
    localStorage.removeItem('error');
  }
  checkLogin() {
    try {
      const token = this.b64_to_utf8(localStorage.getItem('token'));
      if (token) {
        this.checkStatus.next(true);
      } else {
        this.checkStatus.next(false);
      }
    } catch (error) {
      this.checkStatus.next(false);
    }
  }
  loginUser(user: any) {
    return this.http.post(`${this.host}/devengo_api/login/`, user).subscribe(
      (checkUser: any) => {

        console.log(checkUser)
        if (checkUser.data.token) {
          localStorage.setItem('username', checkUser.data.username);
          localStorage.removeItem('error');
          localStorage.setItem('token', this.utf8_to_b64(checkUser.data.token));
          localStorage.setItem('INFO', checkUser.data.type_user.perfil);
          localStorage.setItem('user', this.utf8_to_b64(checkUser.data.user));
          this.errorStatus.next(false);
          this.checkLogin();
        } else {
          localStorage.setItem('error', checkUser.message);
          this.errorStatus.next(true);
          this.checkLogin();
        }
      },
      (error) => {
        //console.log(error.error.meta.message);
        this.checkLogin();
        let mensaje = error.error.meta.message
        localStorage.setItem('error', mensaje);
        this.errorStatus.next(true);
        return error.error;
      }
    );
  }

  eliminarTokensYsession = () => {
    localStorage.clear();
    this.checkLogin();
  }
  getMsjError() {
    return localStorage.getItem('error');
  }

  getToken(): string {
    return this.b64_to_utf8(localStorage.getItem('token'));
  }
  getUser(): string {
    return this.b64_to_utf8(localStorage.getItem('user'));
  }

  utf8_to_b64(str: string): string {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  b64_to_utf8(str: string): string {
    return decodeURIComponent(escape(window.atob(str)));
  }
}
