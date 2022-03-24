import { createAction, props } from '@ngrx/store';
import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';

// action action
export const cargarPlatillos = createAction(
  '[Platillos] Cargar Platillos',
  props<{ text: string }>()
);

export const cargarPlatillosSucces = createAction(
  '[Platillos] Cargar Platillos Success',
  props<{ meals: Meal[] }>()
);

export const cargarPlatillosError = createAction(
  '[Platillos] Cargar Platillos Error',
  props<{ payload: any }>()
);

