import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { LinkIconComponent } from './shared/link-icon/link-icon.component';
import { SubscribeIconComponent } from './shared/subscribe-icon/subscribe-icon.component';
import { DateService } from "./shared/date.service";

import { EpisodeCardComponent } from './shared/episode-card/episode-card.component';
import { PersonCardComponent } from './shared/person-card/person-card.component';
import { RouterModule, Routes } from "@angular/router";
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { EpisodeComponent } from './episode/episode.component';
import { MarkdownModule } from 'angular2-markdown';

const appRoutes: Routes = [
  {
    path: 'episode',
    children: [
      {path: ':id', component: EpisodeComponent}
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MarkdownModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LinkIconComponent,
    SubscribeIconComponent,
    EpisodeCardComponent,
    PersonCardComponent,
    EpisodeComponent
  ],
  providers: [
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
