import { Component } from '@angular/core';
import { MessageConfigurationService } from 'app/services';

@Component({
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent {
  hl7 = '';

  constructor(
    private readonly configService: MessageConfigurationService
  ) {
    this.hl7 = this.configService.retrieve('hl7') ?? '';
  }

  public handleHl7Change(): void {
    this.configService.store('hl7', this.hl7);
  }
}
