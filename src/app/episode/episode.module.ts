import {NgModule} from "@angular/core";
import {EpisodeComponent} from "./episode.component";
import {NotesService} from "./notes.service";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: EpisodeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [EpisodeComponent],
  providers: [NotesService]
})
export class EpisodeModule { }
