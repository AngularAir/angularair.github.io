import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-subscribe-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subscribe-icon.component.html',
  styleUrls: ['./subscribe-icon.component.scss']
})
export class SubscribeIconComponent {
  @Input() icon;
  @Input() link;
  @Input() network;
}
