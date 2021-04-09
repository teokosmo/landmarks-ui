import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '@app/services/api';
import { Utilities } from '@app/common/utilities';
import { GetLoginResponse } from '@app/models/api-user.model';
import { AppVariables } from '@app/common/app-variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'admin';
  password = 'admin';

  constructor(private apiUserService: ApiUserService) { }

  ngOnInit(): void {
    this.apiUserService.login(this.username, this.password)
      .subscribe((loginResponse: GetLoginResponse) => {
        if (Utilities.isDefined(loginResponse.sessionToken)) {
          AppVariables.username = loginResponse.username;
          AppVariables.userSessionToken = loginResponse.sessionToken;
        }
      });
  }

}
