import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs";
import { DateService } from "./shared/date.service";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'ngair-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model;

  constructor(db: AngularFireDatabase, dateService: DateService) {
    let featuredDateRange = dateService.getWeekStartAndEndDateTimeUtc();
    this.model = Observable.combineLatest(
      db.list('/episodes'),
      db.object('/people'),
      db.list('/currentHosts'),
      db.list('/currentPanelists'),
      (episodes, people, currentHosts, currentPanelists) => {
        let currentDateUtc = Date.now();
        let mapEpisode = (episode) => {
          return {
            ...episode,
            id: episode.$key,
            guests: episode.guests ? Object.keys(episode.guests).map(key => people[key]) : null,
            isFeatured: episode.dateTimeUtc > featuredDateRange.start && episode.dateTimeUtc < featuredDateRange.end,
            isUpcoming: episode.dateTimeUtc > featuredDateRange.end,
            isPast: episode.dateTimeUtc < featuredDateRange.start,
            published: episode.dateTimeUtc < currentDateUtc
          };
        };
        return {
          hosts: currentHosts.map(item => people[item.$key]),
          panelists: currentPanelists.map(item => people[item.$key]),
          featuredEpisode: episodes
            .map(mapEpisode)
            .find(episode => episode.isFeatured),
          upcomingEpisodes: episodes
            .map(mapEpisode)
            .filter(episode => episode.isUpcoming)
            .sort((episode1, episode2) => {
              return episode1.dateTimeUtc - episode2.dateTimeUtc;
            })
            .map(mapEpisode),
          pastEpisodes: episodes
            .map(mapEpisode)
            .filter(episode => episode.isPast)
            .sort((episode1, episode2) => {
              return episode2.dateTimeUtc - episode1.dateTimeUtc;
            })

        }
      });
  }
}
