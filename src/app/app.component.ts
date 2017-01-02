import {Component, ChangeDetectionStrategy} from '@angular/core';
import {AppState, Episode} from "./shared/state/app-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {DateService} from "./shared/date.service";

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model;

  constructor(store: Store<AppState>, dateService: DateService) {
    let featuredDateRange = dateService.getWeekStartAndEndDateTimeUtc();
    console.log(featuredDateRange);
    this.model = Observable.combineLatest(
      store.select((state: AppState) => {
        return state.episodes
      }),
      (episodes) => {
        return {
          featuredEpisode: episodes
            .find((episode: Episode) => episode.dateTimeUtc > featuredDateRange.start && episode.dateTimeUtc < featuredDateRange.end),
          upcomingEpisodes: episodes
            .filter((episode: Episode) => episode.dateTimeUtc > featuredDateRange.end)
            .sort((episode1: Episode, episode2: Episode) => {
              return episode1.dateTimeUtc - episode2.dateTimeUtc;
            }),
          pastEpisodes: episodes
            .filter((episode: Episode) => episode.dateTimeUtc < featuredDateRange.start)
            .sort((episode1: Episode, episode2: Episode) => {
              return episode2.dateTimeUtc - episode1.dateTimeUtc;
            })
        }
      });
  }
}
