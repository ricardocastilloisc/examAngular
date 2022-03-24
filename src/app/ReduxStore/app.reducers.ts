import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
export interface AppState {
  platilloRandom: reducers.PlatilloRandomState;
  platillos: reducers.platillosState;
}

export const appReducers: ActionReducerMap<AppState> = {
  platilloRandom: reducers.platilloRandomReducer,
  platillos: reducers.platillosReducer,
};
