import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'ngair-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonCardComponent {
  @Input() person;
}
