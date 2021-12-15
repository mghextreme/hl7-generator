import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

  private currentRoute = '/';

  constructor(
    private readonly router: Router,
    readonly translate: TranslateService
  ) {
    this.currentRoute = router.url;
  }

  public get isHomePage(): boolean {
    return this.currentRoute === '/';
  }

  public get isSendPage(): boolean {
    return this.currentRoute === '/send';
  }

  public get isConfigurePage(): boolean {
    return this.currentRoute === '/configure';
  }
}
