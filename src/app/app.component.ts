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
    this.model = Observable.combineLatest(
      store.select(state => state),
      ({episodes, people, currentHostsIds, currentPanelistsIds}) => {
        let currentDateUtc = Date.now();
        let mapEpisode = (episode: Episode) => {
          return Object.assign(episode, {
            guests: episode.guestIds.map(id => people[id]),
            isFeatured: episode.dateTimeUtc > featuredDateRange.start && episode.dateTimeUtc < featuredDateRange.end,
            isUpcoming: episode.dateTimeUtc > featuredDateRange.end,
            isPast: episode.dateTimeUtc < featuredDateRange.start,
            published: episode.dateTimeUtc < currentDateUtc
          });
        };
        return {
          hosts: currentHostsIds.map(id => people[id]),
          panelists: currentPanelistsIds.map(id => people[id]),
          featuredEpisode: episodes
            .map(mapEpisode)
            .find(episode => episode.isFeatured),
          upcomingEpisodes: episodes
            .map(mapEpisode)
            .filter(episode => episode.isUpcoming)
            .sort((episode1: Episode, episode2: Episode) => {
              return episode1.dateTimeUtc - episode2.dateTimeUtc;
            })
            .map(mapEpisode),
          pastEpisodes: episodes
            .map(mapEpisode)
            .filter(episode => episode.isPast)
            .sort((episode1: Episode, episode2: Episode) => {
              return episode2.dateTimeUtc - episode1.dateTimeUtc;
            })

        }
      });
  }
}
