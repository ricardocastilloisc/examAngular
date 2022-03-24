import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/ReduxStore/app.reducers';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { cargarPlatilloRandom } from 'src/app/ReduxStore/actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  width;
  height;

  constructor(private authService: AuthService, private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.select('platilloRandom').subscribe(
      result => {
        console.log(result);
      }
    )

    this.store.dispatch(cargarPlatilloRandom())
  }

  getUserName = (): string => {
    const { lastname, name } = this.authService.getUser();
    return lastname + ' ' + name;
  };
  onResize(event) {
    const innerWidth = event.target.innerWidth;
    const innerHeight = event.target.innerHeight;

    this.width = innerWidth;
    this.height = innerHeight;
  }
}
