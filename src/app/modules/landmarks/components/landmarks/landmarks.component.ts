import { Component, OnInit } from '@angular/core';
import { Constants } from '@app/common/constants';
import { Utilities } from '@app/common/utilities';
import { GetLandmarksResponse } from '@app/models';
import { ApiLandmarksService } from '@app/services/api';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.css']
})
export class LandmarksComponent implements OnInit {

  constructor(private apiLandmarksService: ApiLandmarksService) { }

  ngOnInit(): void {
    this.apiLandmarksService.getLandmarks().subscribe(
      (getLandmarksResponse: GetLandmarksResponse) => {
        getLandmarksResponse.results.forEach(landmark => {
          Utilities.logMsg(`LandmarksComponent.ngOnInit: ${landmark.title}`);
        });
      },
      (err) => {
        Utilities.logMsg(`LandmarksComponent.ngOnInit: ${err.message})`, Constants.logLevel.error);
      }
    );
  }

}
