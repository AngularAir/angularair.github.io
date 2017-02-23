import {ChangeDetectionStrategy, Component} from "@angular/core";
import {NotesService} from "./notes.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-episode',
  template: `
    <pre><code>{{notes}}</code></pre>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeComponent {
  notes: string;

  constructor(private route: ActivatedRoute, private notesService: NotesService) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.notesService.getNotesByEpisodeId(+params['id']))
      .subscribe((notes: string) => {
        this.notes = notes;
        console.log('wee');
      }, error => {
      });
  }
}
