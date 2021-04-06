import { Component, OnInit } from '@angular/core';
import { ApiLandmarksService } from '@app/services/api';
import { environment } from '@env/environment';
import { GetLandmarksResponse } from '@app/models';
import { Utilities } from '@app/common/utilities';
import { Constants } from '../../../common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = environment.application.name;
  angular = environment.application.angular;
  bootstrap = environment.application.bootstrap;
  fontawesome = environment.application.fontawesome;

  constructor(private apiLandmarksService: ApiLandmarksService) { }

  ngOnInit(): void {
    this.apiLandmarksService.getLandmarks().subscribe(
      (getLandmarksResponse: GetLandmarksResponse) => {
        getLandmarksResponse.results.forEach(landmark => {
          Utilities.logMsg(`HomeComponent.ngOnInit: ${landmark.title})`);
        });
      },
      (err) => {
        Utilities.logMsg(`HomeComponent.ngOnInit: ${err.message})`, Constants.logLevel.error);
      }
    );
  }

}
