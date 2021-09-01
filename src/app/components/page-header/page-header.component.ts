import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  constructor(
    private readonly router: Router,
    readonly translate: TranslateService
  ) { }

  public handleConfigure(): void {
    this.router.navigate(['configuration']);
  }
}
