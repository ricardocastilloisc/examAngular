import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as platilloRandomActions from '../actions/platilloRandom.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { PlatillosService } from 'src/app/services/platillos.service';

@Injectable()
export class platilloRandomEfffects {
  constructor(
    private actions$: Actions,
    private PlatillosService: PlatillosService
  ) {}

  platilloRandom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(platilloRandomActions.cargarPlatilloRandom),
      mergeMap(() =>
        this.PlatillosService.getMealRandom().pipe(
          map((meals) =>
            platilloRandomActions.cargarPlatilloRandomSucces({
              meals: meals,
            })
          ),
          catchError((error) =>
            of(
              platilloRandomActions.cargarPlatilloRandomError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );
}
