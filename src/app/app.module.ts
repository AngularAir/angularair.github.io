import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LinkIconComponent } from './shared/link-icon/link-icon.component';
import { SubscribeIconComponent } from './shared/subscribe-icon/subscribe-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkIconComponent,
    SubscribeIconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
