import { Component } from '@angular/core';
import { Utilities } from './common/utilities';
import { AppVariables } from './common/app-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-starter';
  version = 'Angular version 11.0.7';
  utils = Utilities;
  appvars = AppVariables;
}
