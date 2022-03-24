import { createAction, props } from '@ngrx/store';
import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';

// action action
export const cargarPlatilloRandom = createAction(
  '[Platillo Random] Cargar Platillo Random'
);

export const cargarPlatilloRandomSucces = createAction(
  '[Platillo Random] Cargar Platillo Random Success',
  props<{ meals: Meal[] }>()
);

export const cargarPlatilloRandomError = createAction(
  '[Platillo Random] Cargar Platillo Random Error',
  props<{ payload: any }>()
);
