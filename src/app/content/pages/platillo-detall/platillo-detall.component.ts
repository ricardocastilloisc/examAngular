import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ReduxStore/app.reducers';
import { Store } from '@ngrx/store';
import { cargarPlatillosDetall, unsetCargarPlatillosDetall } from 'src/app/ReduxStore/actions/platilloDetall.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-platillo-detall',
  templateUrl: './platillo-detall.component.html',
  styleUrls: ['./platillo-detall.component.scss'],
})
export class PlatilloDetallComponent implements OnInit, OnDestroy{
  DataPlatillo$: Observable<Meal[]>;

  constructor(
    private parametrosDeRuta: ActivatedRoute,
    private store: Store<AppState>,
    private DS: DomSanitizer,
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(unsetCargarPlatillosDetall());
  }

  ngOnInit(): void {
    const {
      snapshot: {
        params: { id },
      },
    } = this.parametrosDeRuta;

    this.DataPlatillo$ = this.store.select(
      ({ platilloDetall }) => platilloDetall.meals
    );

    this.store.dispatch(cargarPlatillosDetall({ id: id }));
  }
  getVideoIframe(url: string) {
    var video: string, results;

    if (url === null) {
      return '';
    }

    if (url.includes('//www.')) {
      results = url.match('[\\?&]v=([^&#]*)');
      video = results === null ? url : results[1];
    } else {
      let urlArray = url.split('/');
      video = urlArray[urlArray.length - 1];
    }

    return this.DS.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video
    );
  }
}
