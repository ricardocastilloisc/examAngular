import { createAction, props } from '@ngrx/store';
import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';

// action action
export const cargarPlatillosDetall = createAction(
  '[Platillo] Cargar Platillo',
  props<{ id: string }>()
);

export const cargarPlatillosDetallSucces = createAction(
  '[Platillo] Cargar Platillo Success',
  props<{ meals: Meal[] }>()
);

export const cargarPlatillosDetallError = createAction(
  '[Platillo] Cargar Platillo Error',
  props<{ payload: any }>()
);

export const unsetCargarPlatillosDetall = createAction(
  '[Platillo] Cargar Platillo Unset'
);
