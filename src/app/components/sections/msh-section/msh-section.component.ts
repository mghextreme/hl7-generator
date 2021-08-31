import { Component, Input } from '@angular/core';
import { MshSection } from 'app/models';

@Component({
  selector: 'msh-section',
  templateUrl: './msh-section.component.html',
  styleUrls: ['./msh-section.component.scss']
})
export class MshSectionComponent {
  @Input() section: MshSection;
}
