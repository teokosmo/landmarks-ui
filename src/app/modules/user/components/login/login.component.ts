import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '@app/services/api';
import { Utilities } from '@app/common/utilities';
import { GetLoginResponse } from '@app/models/api-user.model';
import { AppVariables } from '@app/common/app-variables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '@app/common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage = '';

  constructor(private apiUserService: ApiUserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.apiUserService.login(this.formControls.username.value, this.formControls.password.value)
      .subscribe((loginResponse: GetLoginResponse) => {
        if (Utilities.isDefined(loginResponse.sessionToken)) {
          AppVariables.username = loginResponse.username;
          AppVariables.userSessionToken = loginResponse.sessionToken;
          this.router.navigateByUrl('');
        } else {
          this.loginErrorMessage = 'Authentication failed.';
        }
      },
      (err) => {
        this.loginErrorMessage = 'Authentication failed.';
        Utilities.logMsg(err.message, Constants.logLevel.error);
      });
  }

  get formControls(): any { return this.loginForm.controls; }

}
