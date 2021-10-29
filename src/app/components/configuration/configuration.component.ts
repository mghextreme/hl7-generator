import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageConfigurationService } from 'app/services';
import { SelectItem } from 'primeng/api/selectitem';
import moment from 'moment';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {

  _msh_1 = '';
  _msh_2_1 = '';
  _msh_2_2 = '';
  _msh_2_3 = '';
  _msh_2_4 = '';
  _msh_3 = '';
  _msh_5 = '';
  _pid_3_4_1 = '';
  _pid_3_4_2 = '';
  _pid_3_6_1 = '';
  _pid_3_6_2 = '';

  _pid_8: string[] = [];
  _pid_10: string[] = [];
  _pid_16: string[] = [];
  _pid_22: string[] = [];
  _pv1_36: string[] = [];

  constructor(
    private readonly configService: MessageConfigurationService,
    readonly translate: TranslateService
  ) {
    this._msh_1 = configService.fieldSeparator;
    this._msh_2_1 = configService.componentSeparator;
    this._msh_2_2 = configService.fieldRepeatSeparator;
    this._msh_2_3 = configService.escapeCharacter;
    this._msh_2_4 = configService.subComponentSeparator;
    this._msh_3 = configService.retrieve('MSH.3');
    this._msh_5 = configService.retrieve('MSH.5');
    this._pid_3_4_1 = configService.retrieve('PID.3.4.1');
    this._pid_3_4_2 = configService.retrieve('PID.3.4.2');
    this._pid_3_6_1 = configService.retrieve('PID.3.6.1');
    this._pid_3_6_2 = configService.retrieve('PID.3.6.2');

    this._pid_8 = configService.retrieveCollection('PID.8');
    this._pid_10 = configService.retrieveCollection('PID.10');
    this._pid_16 = configService.retrieveCollection('PID.16');
    this._pid_22 = configService.retrieveCollection('PID.22');
    this._pv1_36 = configService.retrieveCollection('PV1.36');
  }

  get timezone(): string { return this.configService.timezone; }
  set timezone(value: string) { this.configService.timezone = value; }

  get msh_1(): string { return this._msh_1; }
  set msh_1(value: string) {
    if (value !== this._msh_1) {
      this._msh_1 = value;
      this.configService.fieldSeparator = this.msh_1;
    }
  }

  get msh_2_1(): string { return this._msh_2_1; }
  set msh_2_1(value: string) {
    if (value === this._msh_2_1) { return; }

    this._msh_2_1 = value;
    this.configService.componentSeparator = this.msh_2_1;
  }

  get msh_2_2(): string { return this._msh_2_2; }
  set msh_2_2(value: string) {
    if (value === this._msh_2_2) { return; }

    this._msh_2_2 = value;
    this.configService.fieldRepeatSeparator = this.msh_2_2;
  }

  get msh_2_3(): string { return this._msh_2_3; }
  set msh_2_3(value: string) {
    if (value === this._msh_2_3) { return; }

    this._msh_2_3 = value;
    this.configService.escapeCharacter = this.msh_2_3;
  }

  get msh_2_4(): string { return this._msh_2_4; }
  set msh_2_4(value: string) {
    if (value === this._msh_2_4) { return; }

    this._msh_2_4 = value;
    this.configService.subComponentSeparator = this.msh_2_4;
  }

  get msh_3(): string { return this._msh_3; }
  set msh_3(value: string) {
    if (value === this._msh_3) { return; }

    this._msh_3 = value;
    this.configService.store('MSH.3', this.msh_3);
  }

  get msh_5(): string { return this._msh_5; }
  set msh_5(value: string) {
    if (value === this._msh_5) { return; }

    this._msh_5 = value;
    this.configService.store('MSH.5', this.msh_5);
  }

  get pid_3_4_1(): string { return this._pid_3_4_1; }
  set pid_3_4_1(value: string) {
    if (value === this._pid_3_4_1) { return; }

    this._pid_3_4_1 = value;
    this.configService.store('PID.3.4.1', this.pid_3_4_1);
  }

  get pid_3_4_2(): string { return this._pid_3_4_2; }
  set pid_3_4_2(value: string) {
    if (value === this._pid_3_4_2) { return; }

    this._pid_3_4_2 = value;
    this.configService.store('PID.3.4.2', this.pid_3_4_2);
  }

  get pid_3_6_1(): string { return this._pid_3_6_1; }
  set pid_3_6_1(value: string) {
    if (value === this._pid_3_6_1) { return; }

    this._pid_3_6_1 = value;
    this.configService.store('PID.3.6.1', this.pid_3_6_1);
  }

  get pid_3_6_2(): string { return this._pid_3_6_2; }
  set pid_3_6_2(value: string) {
    if (value === this._pid_3_6_2) { return; }

    this._pid_3_6_2 = value;
    this.configService.store('PID.3.6.2', this.pid_3_6_2);
  }

  get pid_8(): string[] { return this._pid_8; }
  set pid_8(value: string[]) {
    if (value === this._pid_8) { return; }

    this._pid_8 = value;
    this.configService.storeCollection('PID.8', this._pid_8);
  }

  get pid_10(): string[] { return this._pid_10; }
  set pid_10(value: string[]) {
    if (value === this._pid_10) { return; }

    this._pid_10 = value;
    this.configService.storeCollection('PID.10', this._pid_10);
  }

  get pid_16(): string[] { return this._pid_16; }
  set pid_16(value: string[]) {
    if (value === this._pid_16) { return; }

    this._pid_16 = value;
    this.configService.storeCollection('PID.16', this._pid_16);
  }

  get pid_22(): string[] { return this._pid_22; }
  set pid_22(value: string[]) {
    if (value === this._pid_22) { return; }

    this._pid_22 = value;
    this.configService.storeCollection('PID.22', this._pid_22);
  }

  get pv1_36(): string[] { return this._pv1_36; }
  set pv1_36(value: string[]) {
    if (value === this._pv1_36) { return; }

    this._pv1_36 = value;
    this.configService.storeCollection('PV1.36', this._pv1_36);
  }

  get timezonesList(): SelectItem[] {
    return moment.tz
      .names()
      .map((tz: string) => { return { label: tz, value: tz }; });
  }

}
