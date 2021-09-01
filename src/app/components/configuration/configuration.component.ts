import { Component } from '@angular/core';
import { ISection } from 'app/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {

  sections: ISection[] = [];
  hl7 = '';
  expectedHl7 = '';

  constructor(
    readonly translate: TranslateService
  ) { }

}
