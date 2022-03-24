import { createReducer, on } from '@ngrx/store';

import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';
import {
  cargarPlatillosDetall,
  cargarPlatillosDetallError,
  cargarPlatillosDetallSucces,
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
