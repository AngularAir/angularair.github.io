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

@NgModule({
  declarations: [
    AppComponent,
    LinkIconComponent,
    SubscribeIconComponent,
    EpisodeCardComponent,
    PersonCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(rootReducer, appState.data)
  ],
  providers: [
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
