import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeCardComponent {
  @Input() episode;
}
