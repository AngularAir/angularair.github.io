import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-link-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './link-icon.component.html',
  styleUrls: ['./link-icon.component.scss']
})
export class LinkIconComponent {
  @Input() icon;
  @Input() link;
  @Input() title;
}
