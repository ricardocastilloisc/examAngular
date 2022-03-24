import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //flags
  loggedIn = false;
  errorLogin = false;
  loadin = false;
  remember: boolean = false;
  loginForm: FormGroup;
  errmsg: string;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

    //verificar si existe recordatorio de la session
    if (this.authService.getRemember()) {
      this.remember = true;
      this.loginForm.patchValue(this.authService.getRemember());
    }

    this.authService.isUserLoggedIn.subscribe((val) => {
      if (val && !this.loggedIn) {
        this.loggedIn = val;

        setTimeout(() => {
          this.route.navigate(['/home']);
        }, 100);
      }
    });

    this.authService.errorLoggedIn.subscribe((val) => {
      if (val && this.authService.getMsjError()) {
        const newObject = Object.assign(
          {},
          { error: this.authService.getMsjError() }
        );
        const { error } = newObject;
        this.errmsg = error;
        localStorage.removeItem('error');
        this.loadin = false;
      }
    });
  }

  onLogin = () => {
    if (!this.loginForm.invalid) {
      this.errmsg = null;
      this.loadin = true;
      this.authService.loginUser(this.loginForm.value, this.remember);
    } else {
      return;
    }
  };
}
