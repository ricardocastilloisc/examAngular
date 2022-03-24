import { createReducer, on } from '@ngrx/store';
import {
  cargarPlatillos,
  cargarPlatillosError,
  cargarPlatillosSucces,
} from '../actions/platillos.actions';
import { Meal } from 'src/app/interfaces/platillos/platilloRandom.interface';

export interface platillosState {
  text: string;
  meals: Meal[];
  loaded: boolean;
  loading: boolean;
  error: any;
}
export const platillosState: platillosState = {
  text: null,
  meals: [],
  loaded: false,
  loading: false,
  error: null,
};

const _platillosReducer = createReducer(
  platillosState,
  on(cargarPlatillos, (state, { text }) => ({
    ...state,
    loading: true,
    text: text,
  })),

  on(cargarPlatillosSucces, (state, { meals }) => ({
    ...state,
    loading: false,
    loaded: true,
    meals: [...meals],
    error: null,
  })),

  on(cargarPlatillosError, (state, { payload }) => ({
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

export let platillosReducer = (state, action) =>
  _platillosReducer(state, action);
