import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent {

  title = 'app';

  constructor(
    translate: TranslateService,
    private router: Router
  ) {
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'en');
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
