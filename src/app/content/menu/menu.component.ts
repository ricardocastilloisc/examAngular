import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  isLoggenIn = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private apiLogin: AuthService
  ) {}

  ngOnInit(): void {}

  logout() {
    Swal.fire({
      title: '¿Vas a cerrar sesión?',
      text: '¿Estas seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.apiLogin.checkLogin();
        this.apiLogin.logoutUser();
        this.apiLogin.isUserLoggedIn.subscribe(
          (val) => (this.isLoggenIn = val)
        );

        new Promise((resolve) => {
          const intervalo = setInterval(() => {
            if (!this.isLoggenIn) {
              resolve('ok');
              clearInterval(intervalo);
            }
          }, 100);
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
