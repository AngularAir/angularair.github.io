import {compose} from "@ngrx/core";
import {combineReducers} from "@ngrx/store";
import {episodesReducer} from "./episodes.reducer";
import {peopleReducer} from "./people.reducer";

export const reducers = {
  episodes: episodesReducer,
  people: peopleReducer
};

export function rootReducer(state, action) {
  return compose(combineReducers)(reducers)(state, action);
}
