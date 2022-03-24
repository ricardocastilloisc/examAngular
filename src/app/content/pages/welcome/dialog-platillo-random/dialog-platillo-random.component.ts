import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ReduxStore/app.reducers';
import { Store } from '@ngrx/store';
import { cargarPlatilloRandom } from 'src/app/ReduxStore/actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-platillo-random',
  templateUrl: './dialog-platillo-random.component.html',
  styleUrls: ['./dialog-platillo-random.component.scss'],
})
export class DialogPlatilloRandomComponent implements OnInit {
  DataPlatilloRandom$: Observable<Meal[]>;

  constructor(private store: Store<AppState>,private DS: DomSanitizer) {}

  ngOnInit(): void {
    this.DataPlatilloRandom$ = this.store.select(
      ({ platilloRandom }) => platilloRandom.meals
    );

    this.store.dispatch(cargarPlatilloRandom())
  }

  getVideoIframe(url: string) {
    var video: string, results;

    if (url === null) {
      return '';
    }

    if(url.includes('//www.')){
      results = url.match('[\\?&]v=([^&#]*)');
      video = (results === null) ? url : results[1];
    } else {
      let urlArray = url.split('/');
      video = urlArray[urlArray.length - 1 ]
    }

    return this.DS.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }
}
