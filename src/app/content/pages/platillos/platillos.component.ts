import { Component, OnInit } from '@angular/core';

import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ReduxStore/app.reducers';
import { Store } from '@ngrx/store';
import { cargarPlatillos } from 'src/app/ReduxStore/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.scss'],
})
export class PlatillosComponent implements OnInit {
  DataPlatillos$: Observable<Meal[]>;
  colSize = 4;
  limitItems = 6;
  page = 1;

  constructor(private store: Store<AppState>, private route: Router) {}

  ngOnInit(): void {
    this.DataPlatillos$ = this.store.select(({ platillos }) => platillos.meals);

    this.Search();
  }

  Search = (paramSearch = '') => {
    this.store.dispatch(cargarPlatillos({ text: paramSearch }));
  };

  pageChange(event: number) {
    this.page = event;
  }

  verPlatillos(id) {
    this.route.navigateByUrl(
      'dashboard/platilloDetall/' + id
    );
  }


  stringLimit = (label: string) => {
    if (label.length > 100) {
      return label.slice(0, 99) + '...';
    } else {
      return label;
    }
  };
}
