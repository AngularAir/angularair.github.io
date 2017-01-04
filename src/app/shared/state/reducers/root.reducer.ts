import {compose} from "@ngrx/core";
import {combineReducers} from "@ngrx/store";
import {episodesReducer} from "./episodes.reducer";
import {peopleReducer} from "./people.reducer";
import {currentHostsIdsReducer} from "./current-hosts-ids.reducer";
import {currentPanelistsIdsReducer} from "./current-panelists-ids.reducer";

export const reducers = {
  episodes: episodesReducer,
  people: peopleReducer,
  currentHostsIds: currentHostsIdsReducer,
  currentPanelistsIds: currentPanelistsIdsReducer
};

export function rootReducer(state, action) {
  return compose(combineReducers)(reducers)(state, action);
}
