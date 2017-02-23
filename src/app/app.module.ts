import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LinkIconComponent } from './shared/link-icon/link-icon.component';
import { SubscribeIconComponent } from './shared/subscribe-icon/subscribe-icon.component';
import { DateService } from "./shared/date.service";
import { StoreModule } from "@ngrx/store";
import { rootReducer } from "./shared/state/reducers/root.reducer";

import appState from './data.json';
import { EpisodeCardComponent } from './shared/episode-card/episode-card.component';
import { PersonCardComponent } from './shared/person-card/person-card.component';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: 'episode/:id', loadChildren: 'app/episode/episode.module#EpisodeModule'}
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore(rootReducer, appState.data)
  ],
  declarations: [
    AppComponent,
    LinkIconComponent,
    SubscribeIconComponent,
    EpisodeCardComponent,
    PersonCardComponent
  ],
  providers: [
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
