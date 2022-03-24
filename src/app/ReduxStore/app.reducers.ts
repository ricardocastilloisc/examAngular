import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
export interface AppState {
  platilloRandom: reducers.PlatilloRandomState;
}

export const appReducers: ActionReducerMap<AppState> = {
  platilloRandom: reducers.platilloRandomReducer,
};
