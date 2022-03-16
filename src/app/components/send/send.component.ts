import { Component } from '@angular/core';
import { MessageConfigurationService } from 'app/services';
import { SelectItem } from 'primeng/api';

@Component({
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent {
  hl7 = '';

  endpoint = '';
  methodOptions: SelectItem[] = [];
  selectedMethod = 'POST';

  constructor(
    private readonly configService: MessageConfigurationService
  ) {
    this.methodOptions = [
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' }
    ];

    this.hl7 = this.configService.retrieve('hl7') ?? '';
  }

  public handleHl7Change(): void {
    this.configService.store('hl7', this.hl7);
  }
}
