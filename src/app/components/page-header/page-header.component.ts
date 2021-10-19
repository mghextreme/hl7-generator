import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-header',
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

  public handleConfigurationNavigation(): void {
    this.router.navigate(['configuration']);
  }

  public handleHomeNavigation(): void {
    this.router.navigate(['/']);
  }

  public get isHomePage(): boolean {
    return this.currentRoute === '/';
  }

  public get isConfigurationPage(): boolean {
    return this.currentRoute === '/configuration';
  }
}
