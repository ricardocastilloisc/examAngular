import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.loginForm.invalid) {
      this.errmsg = null;
      this.loadin = true;
      this.authService.loginUser(this.loginForm.value);
    } else {
      
      return;
    }
  }
}
