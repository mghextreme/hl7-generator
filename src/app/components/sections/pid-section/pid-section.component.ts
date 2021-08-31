import { Component } from '@angular/core';
import { IField, PidSection } from 'app/models';

@Component({
  selector: 'pid-section',
  templateUrl: './pid-section.component.html',
  styleUrls: ['./pid-section.component.scss']
})
export class PidSectionComponent {
  section: PidSection;

  private structure: IField[] = [];
}
