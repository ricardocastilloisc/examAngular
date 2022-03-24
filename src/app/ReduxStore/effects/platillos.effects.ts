import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as platillosActions from '../actions/platillos.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { PlatillosService } from 'src/app/services/platillos.service';
import { of } from 'rxjs';

@Injectable()
export class PlatillosEfffects {
  constructor(
    private actions$: Actions,
    private PlatillosService: PlatillosService
  ) {}

  cargarPlatillos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(platillosActions.cargarPlatillos),
      mergeMap((action) =>
        this.PlatillosService.getMeals(action.text).pipe(
          map((meals) =>
            platillosActions.cargarPlatillosSucces({ meals: meals })
          ),
          catchError((error) =>
            of(platillosActions.cargarPlatillosError({ payload: error }))
          )
        )
      )
    )
  );
}
