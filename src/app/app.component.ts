import { Component } from '@angular/core';
import { Utilities } from './common/utilities';
import { AppVariables } from './common/app-variables';
import { ApiUserService } from './services/api/api-user.service';
import { Constants } from '@app/common/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  utils = Utilities;
  appvars = AppVariables;

  constructor(private apiUserService: ApiUserService) {}

  logUserOut(): void {
    this.apiUserService.logout()
      .subscribe(() => {
        AppVariables.username = '';
        AppVariables.userSessionToken = '';
      },
      (err) => {
        Utilities.logMsg(err.message, Constants.logLevel.error);
      });
  }
}
