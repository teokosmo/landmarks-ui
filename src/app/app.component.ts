import { Component } from '@angular/core';
import { Utilities } from './common/utilities';
import { AppVariables } from './common/app-variables';
import { ApiUserService } from './services/api/api-user.service';
import { Constants } from '@app/common/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  utils = Utilities;
  appvars = AppVariables;

  constructor(private apiUserService: ApiUserService, private router: Router) {}

  logUserOut(): void {
    this.apiUserService.logout()
      .subscribe(() => {
        Utilities.clearUserSessionData();
        this.router.navigateByUrl('/login');
      },
      (err) => {
        Utilities.logMsg(err.message, Constants.logLevel.error);
      });
  }

  scrollBackToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    return false;
  }

  navigateToProfilePage() {
    return false;
  }
}
