import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ReduxStore/app.reducers';
import { Store } from '@ngrx/store';
import {
  cargarPlatilloRandom,
  unSetCargarPlatilloRandom,
} from 'src/app/ReduxStore/actions';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-platillo-random',
  templateUrl: './dialog-platillo-random.component.html',
  styleUrls: ['./dialog-platillo-random.component.scss'],
})
export class DialogPlatilloRandomComponent implements OnInit, OnDestroy {
  DataPlatilloRandom$: Observable<Meal[]>;

  constructor(
    private store: Store<AppState>,
    private DS: DomSanitizer,
    public dialogRef: MatDialogRef<DialogPlatilloRandomComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(unSetCargarPlatilloRandom());
  }

  ngOnInit(): void {
    this.DataPlatilloRandom$ = this.store.select(
      ({ platilloRandom }) => platilloRandom.meals
    );

    this.store.dispatch(cargarPlatilloRandom());
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

  verPlatillo(id) {
    const datos = {
      id: id,
    };
    this.dialogRef.close(datos);
  }
}
