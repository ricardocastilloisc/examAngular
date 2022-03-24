import { createReducer, on } from '@ngrx/store';
import {
  cargarPlatilloRandom,
  cargarPlatilloRandomError,
  cargarPlatilloRandomSucces,
} from '../actions/platilloRandom.actions';
import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';

export interface PlatilloRandomState {
  meals: Meal[];
  loaded: boolean;
  loading: boolean;
  error: any;
}
export const PlatilloRandomState: PlatilloRandomState = {
  meals: [],
  loaded: false,
  loading: false,
  error: null,
};

const _platilloRandomReducer = createReducer(
  PlatilloRandomState,
  on(cargarPlatilloRandom, (state) => ({ ...state, loading: true })),
  on(cargarPlatilloRandomSucces, (state, { meals }) => ({
    ...state,
    loading: false,
    loaded: true,
    meals: [...meals],
    error: null,
  })),

  on(cargarPlatilloRandomError, (state, { payload }) => ({
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

export let platilloRandomReducer = (state, action) =>
  _platilloRandomReducer(state, action);
