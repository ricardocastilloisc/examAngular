import { createReducer, on } from '@ngrx/store';

import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';
import {
  cargarPlatillosDetall,
  cargarPlatillosDetallError,
  cargarPlatillosDetallSucces,
  unsetCargarPlatillosDetall,
} from '../actions/platilloDetall.actions';

export interface platillosDetallState {
  id: string;
  meals: Meal[];
  loaded: boolean;
  loading: boolean;
  error: any;
}
export const platillosDetallState: platillosDetallState = {
  id: null,
  meals: [],
  loaded: false,
  loading: false,
  error: null,
};

const _platillosDetallReducer = createReducer(
  platillosDetallState,
  on(cargarPlatillosDetall, (state, { id }) => ({
    ...state,
    loading: true,
    id: id,
  })),

  on(unsetCargarPlatillosDetall, (state) => ({
    ...state,
    id: null,
    loading: false,
    loaded: false,
    meals: [],
    error: null,
  })),

  on(cargarPlatillosDetallSucces, (state, { meals }) => ({
    ...state,
    loading: false,
    loaded: true,
    meals: [...meals],
    error: null,
  })),

  on(cargarPlatillosDetallError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export let platillosDetallReducer = (state, action) =>
  _platillosDetallReducer(state, action);
