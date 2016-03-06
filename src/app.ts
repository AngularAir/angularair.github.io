import {Component, Input} from 'angular2/core';
import {hosts} from './hosts';
import {episodes} from './episodes';
import {panelists} from './panelists';
import {pastEpisodes} from './pastEpisodes';

@Component({
  selector: 'person',
  template: `
  <a [attr.href]="'https://twitter.com/' + person.twitter">
    <img [src]="person.avatar"
         ngClass="{'no-circle': person.noCircle}"
         alt="{{ person.name }} Profile Picture">
    <span class="person__name">
      <span class="person__name__name">{{ person.name }}</span>
      <small class="person__name__twitter">@{{ person.twitter }}</small>
    </span>
  </a>
  `
})
export class Person {
  @Input() person: any;
}


@Component({
  selector: 'person-group',
  directives: [Person],
  template: `
  <div
    class="group clearfix group-{{ group.length }}"
    *ngFor="var group of groups">
    <person
      class="person"
      *ngFor="var person of group"
      [person]="person"></person>
  </div>
  `
})
export class PersonGroup {
  @Input() group: any;
}

@Component({
  selector: 'ng-air',
  directives: [PersonGroup],
  template: `
    <div id="logo" class="center">
      <img src="logo.png"/>
    </div>

    <section id="title" class="center">
      <h1>Angular Air</h1>

      <h2>
        A <strong>live</strong> video podcast all about Angular
      </h2>
      <p>
        Brought to you by
        <a href="http://angularclass.com">AngularClass</a>, <a href="https://auth0.com">Auth0</a> and <a href="#sponsors">others</a>
      </p>
    </section>

    <hr />

    <section id="podcast-links" class="center">
      <subscribe-icon icon="apple" network="iTunes" link="https://itunes.apple.com/us/podcast/angular-air/id940806858?mt=2"></subscribe-icon>
      <subscribe-icon icon="youtube" network="YouTube" link="https://www.youtube.com/c/AngularAirPodcast"></subscribe-icon>
      <subscribe-icon icon="rss" network="RSS" link="http://angularair.podbean.com/feed/"></subscribe-icon>
    </section>

    <hr/>


    <section id="episodes">
      <h2>Upcoming Episodes</h2>

      <div *ngFor="var episode of episodes" class="episode">
        <div class="main-episode-content">
          <h3 class="episode__title">
            <a [attr.href]="episode.hangoutUrl">
              {{ episode.title }}
            </a>
            <br/>
            <small>
              {{ episode.displayDate }}
              <span *ngIf="episode.time">
                {{ episode.time }}
              </span>
              <small *ngIf="!episode.time">
                (Time TBA)
              </small>
            </small>
          </h3>
          <div class="hangouts-url">
            <span *ngIf="episode.hangoutUrl">
              <a [attr.href]="episode.hangoutUrl">
                Sign up here
              </a>
              to watch live!
            </span>
            <span *ngIf="!episode.hangoutUrl">
              Stay tuned for a hangouts link!
            </span>
          </div>
          <person-group [groups]="episode.guests"></person-group>
        </div>

        <div class="episode__description justify" *ngIf="episode?.description" [innerHTML]="episode?.description"></div>

        <div class="episode__sponsors" *ngIf="episode.sponsors?.length">
          <h4>
            Episode Sponsor{{ episode.sponsors.length > 1 ? 's' : '' }}
          </h4>
          <person-group [groups]="episode.sponsors"></person-group>

          <div class="episode__description justify" [innerHTML]="episode.sponsorship"></div>
        </div>
        <hr ng-if="!$last"/>
      </div>
    </section>

    <hr/>

    <section id="sponsors">

      <h2>Sponsors</h2>

      <h3>Premier Sponsor</h3>

      <a href="http://angularclass.com" title="Onsite Angular Training (US)">
        <img
                style="width: 200px;margin: 40px auto 0;display: block;"
                src="https://cloud.githubusercontent.com/assets/1016365/9863770/cb0620fc-5af7-11e5-89df-d4b0b2cdfc43.png"
                alt="Onsite Angular Training (US)">
        <p style="font-size: 18px;text-align:center">
          AngularClass<br/>
          Onsite Angular Training (US)
        </p>
      </a>

      <h3>Platinium Sponsor</h3>

      <a href="https://auth0.com" title="Single Sign On and Token Based Auth0">
        <img
                style="width: 200px;margin: 40px auto 0;display: block;"
                src="https://styleguide.auth0.com/lib/logos/img/logo-blue.png"
                alt="Single Sign On and Token Based Auth0">
        <p style="font-size: 18px;text-align:center">
          Auth0<br/>
          Single Sign On & Token Based Authentication
        </p>
      </a>

      <h3>Gold Sponsor</h3>

      <a href="http://thoughtram.io" title="Onsite Angular Training (Europe)">
        <img
                style="width: 200px;margin: 40px auto 0;display: block;"
                src="http://thoughtram.io/images/thoughtram-brain-with-logo-line-blue.png"
                alt="Onsite Angular Training (Europe)">
        <p style="font-size: 18px;text-align:center">
          Thoughtram<br/>
          Onsite Angular Training (Europe)
        </p>
      </a>

    </section>

    <hr/>

    <section id="past-episodes" class="episode">
      <h2>Past Episodes</h2>
      <ul>
        <li *ngFor="var episode of pastEpisodes; var $index = index">
          <a [attr.href]="episode.hangoutUrl">{{ 'Episode ' + $index + ': ' + episode.title}}</a>
          <small *ngIf="episode.sponsors">
            Sponsored by:
            <span *ngFor="var group of episode.sponsors; var $last = last; var $first = first">
              <span *ngFor="var sponsor of group">
                {{ !$first && $last ? ' and ' : '' }}
                <a [attr.href]="sponsor.website">
                  {{ sponsor.name }}
                </a>
                {{ !$last ? ',' : ''}}
              </span>
            </span>
          </small>
        </li>
      </ul>
    </section>

    <hr/>



    <section class="clearfix">
      <h2>Host</h2>
      <person-group [groups]="hosts"></person-group>
      <div class="center">
        AngularAir is hosted by
        <a href="https://twitter.com/jeffwhelpley">Jeff Whelpley</a>
      </div>
    </section>

    <hr/>

    <section id="panelists">
      <h2>Panelists</h2>
      <person-group [groups]="panelists"></person-group>
      <div class="center">
        AngularAir has a panel of some of the most awesome Angular developers the community has to offer
      </div>
    </section>

    <hr/>

    <section class="center">
      <h2>Video Podcast</h2>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLF75bDBd1tIdwQq6TNd-wNx0AcB8JPeDK" frameborder="0" allowfullscreen></iframe>
    </section>

    <hr/>

    <section class="center">
      <h2>Audio Podcast</h2>
      <iframe id="multi_iframe" frameborder="0" scrolling="no" allowfullscreen="" src="https://www.podbean.com/media/player/multi?playlist=https%3A%2F%2Fplaylist.podbean.com%2F716841%2Fplaylist_multi.xml&width=420&height=315&download=0&share=1&fonts=Helvetica&auto=0&connection=https&skin=9" width="420" height="315"></iframe>
    </section>

    <hr/>

    <section class="center">
      <link-icon icon="twitter" link="https://twitter.com/angularair" title="Angular Air on Twitter"></link-icon>
      <link-icon icon="google-plus" link="https://plus.google.com/u/0/+AngularAirPodcast/posts" title="Angular Air on Google+"></link-icon>
    </section>

  `
})
export class NgAir {
  hosts = hosts;
  panelists = panelists;
  episodes = episodes;
  pastEpisodes = pastEpisodes;
  constructor() {
    this.panelists.forEach((panelistGroup: any) => {
      panelistGroup.forEach((panelist: any) => {
        if (!panelist.avatar) {
          panelist.avatar = 'panel/' + panelist.twitter + '.png';
        }
      });
    });

    this.episodes.forEach((episode: any) => {
      episode.guests.forEach((group: any) => {
        group.forEach((guest: any) => {
          if (!guest.avatar) {
            guest.avatar = 'episodes/' + episode.date + '/' + guest.twitter + '.' + (guest.imageExt || 'png');
          }
        });
      });

      // markdownGetter.getDescription(episode.date).then(function success(markdown) {
      //   episode.description = markdown;
      // });
      // markdownGetter.getSponsorship(episode.date).then(function success(markdown) {
      //   episode.sponsorship = markdown;
      // });
    });
  }
}







@Component({
  selector: 'app',
  directives: [ NgAir ],
  template: `
  <ng-air></ng-air>
  `
})
export class App {
  constructor() {

  }
}
