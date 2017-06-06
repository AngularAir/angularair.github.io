import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'ngair-episode',
    template: `<markdown [data]="notes?.$value"></markdown>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeComponent {
  notes;

  constructor(private db: AngularFireDatabase,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.notes = this.db.object(`/episodeNotes/${params['id']}`);
      }, error => {
      });
  }
}
