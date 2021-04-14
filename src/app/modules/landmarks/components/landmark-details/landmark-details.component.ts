import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILandmarkObject } from '@app/models';
import { ApiLandmarksService } from '@app/services/api';
import { Observable } from 'rxjs';
import { Utilities } from '@app/common/utilities';

@Component({
  selector: 'app-landmark-details',
  templateUrl: './landmark-details.component.html',
  styleUrls: ['./landmark-details.component.css']
})
export class LandmarkDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiLandmarksService: ApiLandmarksService) { }

  landmarkObjectId: string;
  landmark$: Observable<ILandmarkObject>;
  utils = Utilities;

  ngOnInit(): void {
    this.landmarkObjectId = this.route.snapshot.paramMap.get('objectId');
    this.landmark$ = this.apiLandmarksService.getLandmark(this.landmarkObjectId);
  }

}
