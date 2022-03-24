import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as platillosDetallActions from '../actions/platilloDetall.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { PlatillosService } from 'src/app/services/platillos.service';
import { of } from 'rxjs';

@Injectable()
export class platillosDetallEfffects {
  constructor(
    private actions$: Actions,
    private PlatillosService: PlatillosService
  ) {}

  cargarplatillosDetall$ = createEffect(() =>
    this.actions$.pipe(
      ofType(platillosDetallActions.cargarPlatillosDetall),
      mergeMap((action) =>
        this.PlatillosService.getMealId(action.id).pipe(
          map((meals) =>
            platillosDetallActions.cargarPlatillosDetallSucces({ meals: meals })
          ),
          catchError((error) =>
            of(
              platillosDetallActions.cargarPlatillosDetallError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );
}
